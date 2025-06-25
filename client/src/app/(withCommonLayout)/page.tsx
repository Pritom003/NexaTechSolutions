import Hero from '@/Component/Homecomponent/homeHero'
import OurLocation from '@/Component/OurLocation/Ourlocation'
import ServicesSlider from '@/Component/ourServices/services'

// import Navbar from '@/Component/shared/Navbar'
import WhatsappWidget from '@/Component/Whatsapp/WhatsappWidget'
import React from 'react'

const HomePage = () => {
  return (
    <div 
    >
    <Hero></Hero> 

<ServicesSlider></ServicesSlider>
<OurLocation></OurLocation>
<WhatsappWidget></WhatsappWidget>

    </div>
  )
}

export default HomePage