from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint , Date  , Float , and_
from sqlalchemy.orm import relationship
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import jsonify,request
import base64
from datetime import datetime
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:b896dFayEb6DPCHsbSFJ@postgres-database.cvlzrwxpaohf.us-east-1.rds.amazonaws.com:5432/manga'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@dataclass
class User(db.Model):
    __tablename__ = 'user'

    id: int
    username: str
    email: str
    firstname: str
    lastname: str
    fechaNac: str
    pais: str
    password: str
    wallet: float

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    firstname = Column(String(80), nullable=False)
    lastname = Column(String(80), nullable=False)
    fechaNac = Column(String(10), nullable=False)
    pais = Column(String(80), nullable=False)
    password = Column(String(80), nullable=False)
    wallet = Column(Float)
    comentarios = relationship('Comentario', backref='user_a', lazy=True)
    compras_user = relationship('Compra', backref='user_b', lazy=True)
    profile_picture = relationship('User_pfp', backref='user_image', lazy=True)

    def __init__(self, username, email, firstname, lastname, fechaNac, pais, password, wallet):
        self.username = username
        self.email = email
        self.firstname = firstname
        self.lastname = lastname
        self.fechaNac = fechaNac
        self.pais = pais
        self.password = password
        self.wallet = wallet

    def __repr__(self):
        return f'<User {self.username}>'


@dataclass
class User_pfp(db.Model):
    __tablename__ = 'user_pfp'

    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    size = Column(Integer)
    data = Column(db.LargeBinary)
    user_id = Column(Integer, ForeignKey('user.id', ondelete="CASCADE"), nullable=False, unique=True)

    def __repr__(self):
        return f"Image('{self.name}', '{self.size}', '{self.uploaded_at}')"


@dataclass
class Manga(db.Model):
    __tablename__ = 'manga'

    id: int
    nombre: str
    edicion: int
    cant_stock: int
    genero: str
    precio: float
    link: str

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    edicion = Column(Integer, nullable=False)
    cant_stock = Column(Integer, nullable=False)
    genero = Column(String(100), nullable=False)
    precio = Column(Float, nullable=False)
    link = Column(String(500), nullable=False, unique=True)
   
    __table_args__ = (UniqueConstraint('nombre', 'edicion', name='identificadorManga'),)

    comentarios_m = relationship('Comentario', backref='manga', lazy=True)
    compras_manga = relationship('Compra', backref='manga', lazy=True)

    def __repr__(self):
        return f'<Manga {self.id}, {self.nombre}, {self.edicion}>'


@dataclass
class Comentario(db.Model):
    __tablename__ = 'comentario'

    id: int
    contenido: str
    user_id: int
    manga_id: int

    id = Column(Integer, primary_key=True)
    contenido = Column(String(1000), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    manga_id = Column(Integer, ForeignKey('manga.id'), nullable=False)

    def __repr__(self):
        return f'<Comentario {self.contenido}>'


@dataclass
class Compra(db.Model):
    __tablename__ = 'compra'

    id: int
    id_user: int
    manga_id: int
    fecha: Date

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('user.id'), nullable=False)
    manga_id = Column(Integer, ForeignKey('manga.id'), nullable=False)
    fecha = Column(Date, nullable=False)

    def __repr__(self):
        return f'<Compra {self.id}, {self.manga_nombre}, {self.manga_edicion}>'


userCache = {}

with app.app_context():
    db.create_all()


@app.route('/upload/<user_id>', methods=['POST' , 'PUT'])
def upload(user_id):
    if request.method == 'POST':
        file = request.files['image']

 
        file_data = file.read()
        file_name = file.filename
        file_size = len(file_data)

       
        user_pfp = User_pfp(
            name=file_name,
            size=file_size,
            data=file_data,
            user_id=user_id
        )
       
        db.session.add(user_pfp)
        db.session.commit()

        return 'SUCCESS'
    elif request.method == 'PUT':

        file = request.files['image']
        file_data = file.read()
        file_name = file.filename
        file_size = len(file_data)


        user_pfp = User_pfp.query.filter_by(user_id=user_id).first()
        if user_pfp is not None:
        
            user_pfp.name = file_name
            user_pfp.size = file_size
            user_pfp.data = file_data

         
            db.session.commit()
            return 'SUCCESS'
        else:
           
            return 'ERROR: No existe imagen de perfil para este usuario'




@app.route('/image/<user_id>', methods=['GET'])
def get_image_data(user_id):
    image_data = User_pfp.query.filter_by(user_id=user_id).first()
    if image_data:
        image_data_dict = {
            'id': image_data.id,
            'name': image_data.name,
            'size': image_data.size,
            'data': base64.b64encode(image_data.data).decode('utf-8'),
            'user_id': image_data.user_id
        }
        return jsonify(image_data_dict)
    else:
        return jsonify(error='Image not found'), 404
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)

