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




@app.route('/users', methods=['GET', 'POST'])
def route_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)

    elif request.method == 'POST':
        data = request.get_json()
        fecha_nac_string = data['fechaNac']
        fecha_nac = datetime.strptime(fecha_nac_string, '%Y-%m-%d').date()
        new_user = User(username=data['username'], email=data['email'], firstname=data['firstname'],
                        lastname=data['lastname'], fechaNac=fecha_nac, pais=data['pais'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return 'SUCCESS'


@app.route('/users/<users_id>', methods=['GET', 'PUT', 'DELETE'])
def route_user_id(users_id):
    global userCache

    if request.method == 'GET':
        user = User.query.get_or_404(users_id)
        return jsonify(user)

    elif request.method == 'PUT':
        data = request.get_json()
        current_user = User.query.get_or_404(users_id)
        fecha_nac_string = data['fechaNac']
        fecha_nac = datetime.strptime(fecha_nac_string, '%Y-%m-%d').date()

        if current_user.email in userCache.keys():
            del userCache[current_user.email]

        current_user.username = data['username']
        current_user.email = data['email']
        current_user.firstname = data['firstname']
        current_user.lastname = data['lastname']
        current_user.fechaNac = fecha_nac
        current_user.pais = data['pais']
        current_user.wallet = data['wallet']

        db.session.commit()
        user=User.query.get_or_404(users_id)
        return jsonify(user)

    elif request.method == 'DELETE':
        user = User.query.get_or_404(users_id)
        db.session.delete(user)
        db.session.commit()
        return 'SUCCESS'
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
