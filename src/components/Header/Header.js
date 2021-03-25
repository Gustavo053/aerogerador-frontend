import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

function Header() {
    return (
        <>
            <header id="header">
                <nav>
                    <div>
                        <Link to="/">Gráfico</Link>
                    </div>
                    <div>
                        LogAp Sistemas
                    </div>
                    <div>
                        <Link id="busca" to="/algoritmo">Algoritmo</Link>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;