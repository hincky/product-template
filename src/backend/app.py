from flask import Flask, jsonify, session
from flask_cors import CORS
import mysql.connector  # 导入MySQL连接库

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 用于Flask会话管理
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

# 数据库连接配置
db_config = {
    'user': 'hincky',
    'password': 'cky62200',
    'host': 'localhost',
    'database': 'xiangjiang'
}

def read_database_data():
    try:
        print("\n=== 从数据库读取数据 ===")
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                series, 
                model, 
                color, 
                length, 
                width, 
                height, 
                seat_depth AS seatDepth, 
                chaise, 
                price, 
                material AS frame, 
                '' AS auxiliary,  
                '' AS fabric,     
                texture AS touch, 
                seating_feel AS seatingFeel
            FROM products_on_sale
        """)
        data = cursor.fetchall()
        print(f"成功读取到 {len(data)} 条数据")
        return data
    except mysql.connector.Error as err:
        print(f"读取数据库出错: {err}")
        return []
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/backend/api/products', methods=['GET'])
def get_all_products():
    print("\n=== 收到获取所有产品请求 ===")
    data = read_database_data()
    print(f"返回数据总数: {len(data)}")
    return jsonify(data)

@app.route('/backend/api/products/<int:index>', methods=['GET'])
def get_product(index):
    print("\n=================== 后端接收到请求 ===================")
    print(f"请求获取第 {index + 1} 条数据")
    
    data = read_database_data()
    if 0 <= index < len(data):
        product = data[index]
        print("\n获取到的数据:")
        print("----------------------------------------")
        print(f"系列: {product.get('series', '')}")
        print(f"型号: {product.get('model', '')}")
        print(f"长度: {product.get('length', '')}")
        print(f"宽度: {product.get('width', '')}")
        print(f"高度: {product.get('height', '')}")
        print(f"坐: {product.get('seatDepth', '')}")
        print(f"妃位: {product.get('chaise', '')}")
        print(f"进价: {product.get('price', '')}")
        print("----------------------------------------")
        return jsonify(product)
    
    print(f"错误: 索引 {index} 超出范围")
    return jsonify({"error": "Product not found"}), 404

@app.route('/', methods=['GET'])
def get_first_product():
    print("\n=== 加载页面时获取第一条数据 ===")
    data = read_database_data()
    if data:
        session['current_index'] = 0
        return jsonify(data[0])
    return jsonify({"error": "No data available"}), 404

@app.route('/api/next', methods=['GET'])
def get_next_product():
    print("\n=== 获取下一条数据 ===")
    data = read_database_data()
    current_index = session.get('current_index', 0)
    if current_index + 1 < len(data):
        session['current_index'] = current_index + 1
        return jsonify(data[current_index + 1])
    return jsonify({"error": "No more data"}), 404

@app.route('/api/previous', methods=['GET'])
def get_previous_product():
    print("\n=== 获取上一条数据 ===")
    data = read_database_data()
    current_index = session.get('current_index', 0)
    if current_index > 0:
        session['current_index'] = current_index - 1
        return jsonify(data[current_index - 1])
    return jsonify({"error": "No previous data"}), 404

if __name__ == '__main__':
    print("\n=== 后端服务启动 ===")
    test_data = read_database_data()
    print(f"初始测试: 读取到 {len(test_data)} 条数据")
    if test_data:
        print("第一条数据示例:")
        print(test_data[0])
    
    app.run(debug=True, port=5000)
