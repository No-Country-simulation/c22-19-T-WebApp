import './Login.css'
import fincoLogo from '../../assets/fincoLogo.svg'


export const Login = () => {
    return (
      <div className="container-dark">
        <a href="/"><img src={fincoLogo} alt="logo finco" className='logo' /></a>
        <form action="login" method="post">
            <input type="email" name="email" id="email" placeholder='Correo electronico...' />
            <input type='password' name='password' id='password' placeholder='Contraseña...'></input>            
            <input type="submit" value="Iniciar Sesión" className='btnLogin' />
        </form>

      </div>
      );
}
