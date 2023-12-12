import logo from "../assets/logo.png";
import "./FooterStyle.css";

const Footer = () => {
	return (
		<footer>
			{/* <div className="footer-top">
				<div className="footer-top-left">
					<p>
						MINI Super JOEL <br />
						Constituyente Francisco J. Mujica #2747 Col. El Palmito <br />{" "}
						Telefono: ## #### ####
					</p>
				</div>
				<div className="footer-top-center">
					<ul>
						<li className="title">Centro de ayuda</li>
						<li>
							<a href="">¿Como comprar?</a>
						</li>
						<li>
							<a href="">Preguntas frecuentes</a>
						</li>
						<li>
							<a href="">Contacto</a>
						</li>
					</ul>
				</div>
				<div className="footer-top-right">
					<ul>
						<li className="title">Información</li>
						<li>
							<a href="">Políticas de privacidad</a>
						</li>
						<li>
							<a href="">Terminos y condiciones</a>
						</li>
						<li>
							<a href="">Políticas de Cookies</a>
						</li>
					</ul>
				</div>
			</div> */}
			<div className="footer-bottom">
				<div>
					<img src={logo} alt="Logo del establecimiento" />
					<p>
						© 2023 Mini Super Joel. <br />
						Todos los derechos reservados
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
