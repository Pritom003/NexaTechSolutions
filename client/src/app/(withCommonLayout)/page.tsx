import Hero from '@/Component/Homecomponent/homeHero'
import OurLocation from '@/Component/OurLocation/Ourlocation'
import ServicesSlider from '@/Component/ourServices/services'
import Footer from '@/Component/shared/footer'
import Navbar from '@/Component/shared/Navbar'
import WhatsappWidget from '@/Component/Whatsapp/WhatsappWidget'
import React from 'react'

const HomePage = () => {
  return (
    <div 
    >
    <Hero></Hero> 
<div >
        <Navbar></Navbar>  
</div>
<ServicesSlider></ServicesSlider>
<OurLocation></OurLocation>
<WhatsappWidget></WhatsappWidget>
<Footer></Footer>
    </div>
  )
}

export default HomePage