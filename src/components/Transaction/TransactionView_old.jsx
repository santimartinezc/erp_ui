import React, { useState } from 'react';

const SaleView = () => {
    const [barCode, setBarCode] = useState('');
    const [product, setProduct] = useState({ nombre: '', impuesto: '', precio: '' });
    const [cart, setCart] = useState([]);

    const handleSearch = () => {
        // Lógica para buscar producto por código de barras
        // Simulación de datos obtenidos:
        const productData = { nombre: 'Producto X', impuesto: '21%', precio: '10.00' };
        setProduct(productData);
    };

    const handleAddToCart = () => {
        // Lógica para añadir al carrito
        setCart([...cart, product]);
        setProduct({ nombre: '', impuesto: '', precio: '' });
    };

    const handleCancel = () => {
        // Lógica para cancelar
        setProduct({ nombre: '', impuesto: '', precio: '' });
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={barCode}
                    onChange={(e) => setBarCode(e.target.value)}
                    placeholder="Código de barras"
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <div>
                <input
                    type="text"
                    value={product.nombre}
                    onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
                    placeholder="Nombre"
                />
                <input
                    type="text"
                    value={product.impuesto}
                    onChange={(e) => setProduct({ ...product, impuesto: e.target.value })}
                    placeholder="Impuesto"
                />
                <input
                    type="text"
                    value={product.precio}
                    onChange={(e) => setProduct({ ...product, precio: e.target.value })}
                    placeholder="Precio"
                />
                <button onClick={handleAddToCart}>Añadir al carrito</button>
                <button onClick={handleCancel}>Cancelar</button>
            </div>
            <div>
                <h2>Carrito</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{`${item.nombre} - ${item.impuesto} - ${item.precio}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SaleView;
