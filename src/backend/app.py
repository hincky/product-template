from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# 获取Excel文件的绝对路径
current_dir = os.path.dirname(os.path.abspath(__file__))
excel_path = os.path.join(current_dir, '..', 'components', 'test.xlsx')

def read_excel_data():
    try:
        print(f"\n=== 读取Excel文件: {excel_path} ===")
        df = pd.read_excel(excel_path)
        data = df.to_dict('records')
        print(f"成功读取到 {len(data)} 条数据")
        return data
    except Exception as e:
        print(f"读取Excel文件出错: {e}")
        return []

@app.route('/backend/api/products', methods=['GET'])
def get_all_products():
    print("\n=== 收到获取所有产品请求 ===")
    data = read_excel_data()
    print(f"返回数据总数: {len(data)}")
    return jsonify(data)

@app.route('/backend/api/products/<int:index>', methods=['GET'])
def get_product(index):
    print("\n=================== 后端接收到请求 ===================")
    print(f"请求获取第 {index + 1} 条数据")
    
    data = read_excel_data()
    if 0 <= index < len(data):
        product = data[index]
        print("\n获取到的数据:")
        print("----------------------------------------")
        print(f"系列: {product.get('系列', '')}")
        print(f"型号: {product.get('型号', '')}")
        print(f"长度: {product.get('长度', '')}")
        print(f"宽度: {product.get('宽度', '')}")
        print(f"高度: {product.get('高度', '')}")
        print(f"坐深: {product.get('坐深', '')}")
        print(f"妃位: {product.get('妃位', '')}")
        print(f"进价: {product.get('进价', '')}")
        print("----------------------------------------")
        return jsonify(product)
    
    print(f"错误: 索引 {index} 超出范围")
    return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':
    print("\n=== 后端服务启动 ===")
    print(f"Excel文件路径: {excel_path}")
    test_data = read_excel_data()
    print(f"初始测试: 读取到 {len(test_data)} 条数据")
    if test_data:
        print("第一条数据示例:")
        print(test_data[0])
    
    app.run(debug=True, port=5000)
