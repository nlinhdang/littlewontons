// import logo from './img/little wontons logo.png'
import fullLogo from './img/full-logo.png'
import wonton1 from './img/boiled-wonton.png'
import wonton2 from './img/fried-wonton.png'
import wonton3 from './img/soup-wonton.png'
import frozenPack from './img/frozen-pack.png'
import lunchBox from './img/lunch-box.png'
import whatsapLogo from './icons/whatsapp.svg'
import zaloLogo from './icons/zalo.svg'
import { useMemo } from 'react'
import OrderButton from './OrderButton'



const productsTable = [
  {
    name: 'Simply Pork',
    frozenPrice: '50k',
    cookedPrice: '70k',
mainIngr: '*fresh ground pork',
    isFrozen: true,
    isLunch: true,
  },
  {
    name: 'Juicy Shrimp & Pork',
    frozenPrice: '70k',
    cookedPrice: '90k',
  mainIngr: '*fresh ground pork & fresh shrimp',
    isFrozen: true,
    isLunch: true,
  },
  {
    name: 'Mix 5 pieces each',
    frozenPrice: '',
    cookedPrice: '80k',
  mainIngr: '',
    isFrozen: false,
    isLunch: true,
  },
  {
    name: 'Simple Shrimp',
    frozenPrice: '80k',
    cookedPrice: '',
  mainIngr: '*fresh shrimp',
    isFrozen: true,
    isLunch: false,

  },
  {
    name: 'Cheese Burger',
    frozenPrice: '80k',
    cookedPrice: '',
  mainIngr: '*fresh ground beef & cheddar cheese',
    isFrozen: true,
    isLunch: false,

  },
  {
    name: 'Chicken & Cabbage',
    frozenPrice: '50k',
    cookedPrice: '',
  mainIngr: '*fresh ground chicken & cabbage',
    isFrozen: true,
    isLunch: false,

  },
  {
    name: 'Chicken & Shrimp',
    frozenPrice: '80k',
    cookedPrice: '',
  mainIngr: '*fresh ground chicken & fresh shrimp',
    isFrozen: true,
    isLunch: false,

  }
];


const Homepage = ({ productRef, homeRef, activeLink, setActiveLink }) => {
  const frozenProducts = useMemo(
    () => productsTable.filter(product => product.isFrozen),
    [productsTable]
  );
  const lunchProducts = useMemo(
    () => productsTable.filter(product => product.isLunch),
    [productsTable]);
  

  return (
    <div className='container homepage-container'>
      
      <content className="homepage">
        <section ref={homeRef}className="introduction-section">
          <img src={fullLogo} alt="full logo" className='full-logo'/>

          <div className='title'>Delicious Homemade Wontons <br />
              Fresh <span style={{ fontWeight: 'normal'}}>Ingredients,</span> Quick & Easy <span style={{ fontWeight: 'normal'}}>to Cook!</span>
          </div>
          
          <div className="wontons-photo">
            <img src={wonton1} alt="wonton photo"/>
            <img src={wonton2} alt="wonton photo"/>
            <img src={wonton3} alt="wonton photo"/>
          </div>

          <div className="intro">
            <h2>Craving a warm, comforting meal?</h2>
              
            <p>Homemade with <span>fresh ingredients</span>, our wontons cook in <span>minutes</span></p>
              <p>— whether <span>boiled, steamed,</span> or <span>fried</span>.</p>
              
              <p>Enjoy <span>authentic taste</span> at home with <span>easy delivery.</span></p>

            <p>Treat yourself — it’s that simple. <span>Order now!</span></p>
          </div>
        </section>
        
        <line></line>

        <section ref={productRef} className="product-section">
          <h1>Our Products</h1>
          <div className="frozen-pack">
            <h2>1. Frozen packs</h2>
            <div className='frozen-pack-info'>
              <p><span>Homemade, freshly prepared,</span> then <span>frozen</span> for easy storage and cooking at home.</p>
              <p>Little Wontons come with <span>optional sauces</span> (Chinese Laoganma chili oil, sweet & chili sauce) and pair well with soy sauce.</p>
              <img src={frozenPack} alt="" />
            </div>

            <table class="price-table">
              <thead>
                <tr>
                  <th colspan="4">
                    Frozen bags delivered to either the ES, MS or HS Staffroom freezer<br />
                    (price per 10 pieces)
                  </th>
                </tr>
              </thead>
              <tbody>
                {frozenProducts.map((product, index) => (
            <tr key={index}>
                    <td colspan="2">
                      <div>{product.name}</div>
                      <div className='main-ingr'>{product.mainIngr}</div></td>
              <td>{product.frozenPrice}</td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>

          <div className="lunch-box">
            <h2>2. Lunch Box</h2>
            <div className='lunch-box-info'>
              <p>Order your Little Wontons Lunch Box, every <span>Monday, Wednesday</span> and <span>Friday</span>, <span>cooked and delivered</span> to you.</p>
              <p>Each portion brings <span>10 wontons, bok choy, sauce of your choice</span>, and <span>seasonal fruits!</span></p>
              <img src={lunchBox} alt="lunch box" />
            </div>

            <table class="price-table">
              <thead>
                <tr>
                  <th colspan="4">
                    Lunch boxes – delivered to the front gate delivery table<br></br>at either 11.05 or 12.20
                  </th>
                </tr>
              </thead>
              <tbody>
                {lunchProducts.map((product, index) => (
            <tr key={index}>
                    <td colspan="2">
                      <div>{product.name}</div>
                      {product.mainIngr && <div className='main-ingr'>{product.mainIngr}</div>}</td>
              <td>{product.cookedPrice}</td>
            </tr>
          ))}
              </tbody>
            </table>

          </div>
        </section>
        
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
      </content>
    </div>
  );
}
 
export default Homepage;