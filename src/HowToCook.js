import fullLogo from './img/full-logo.webp'
import cook1 from './img/cook1.png'
import cook2 from './img/cook2.png'
import boiled from './img/boiled-wonton.webp'
import fried from './img/fried-wonton.webp'
import soup from './img/soup-wonton.webp'
import whatsapLogo from './icons/whatsapp.svg'
import zaloLogo from './icons/zalo.svg'
import OrderButton from './OrderButton'

const HowToCook = ({ activeLink, setActiveLink }) => {
  return (
    <div className='container'>
      <content>
        <div className="how-to-cook-container">
          <section className="introduction-section">
        <img src={fullLogo} alt="full logo" className='full-logo'/>

        <div className='title'>Delicious Homemade Wontons <br />
            Fresh <span style={{ fontWeight: 'normal'}}>Ingredients,</span> Quick & Easy <span style={{ fontWeight: 'normal'}}>to Cook!</span>
        </div>
        </section>

        <section className='how-to-cook-section'>

          <h2>How to cook</h2>

          <div className="step1">
            <img src={cook1} alt="" />
            <p>Boil water to cover the wontons by 1.5 to 2 times their height.</p>
          </div>

          <div className="step2">
            <img src={cook2} alt="" />
            <p>Once boiling, add frozen wontons. When they float, cook for another 4-5 minutes. <br/>
            ** Veggie wontons with cooked filling only need 2-3 minutes.</p>
          </div>
          <p>*** You can also deep-fry frozen wontons in hot oil until golden brown.</p>

        </section>

        <section className="example-section">
          <h2>Some ways to enjoy wontons</h2>
          <div className="boiled">
            <img src={boiled} alt="" />
            <p>Boiled & dipped with chili oil sauce.</p>
          </div>
          <div className="fried">
            <img src={fried} alt="" />
            <p>Fry & dipped with sweet chili sauce.</p>
          </div>
          <div className="soup">
            <img src={soup} alt="" />
            <p>Make wonton soup with or without noodle and bok choy.</p>
          </div>
        </section>

        <div className='order-now'>Feeling hungry? Let’s get it now — don’t keep your tummy waiting!</div>

      <section className="order-section">
        <OrderButton 
            activeLink={activeLink} 
            setActiveLink={setActiveLink} 
          />
        <p>or DM me</p>
        <div className="icon-block">
          <img src={zaloLogo} alt="zalo Logo"/>
          <img src={whatsapLogo} alt="whatsapp Logo"/>
          0986289155
        </div>
        </section>
        </div>
      </content>
    </div>
      
  );
}
 
export default HowToCook;