import React from 'react'
import fb from '../assets/eva_facebook-outline.jpg'
import yt from '../assets/feather_youtube.jpg'
import tw from '../assets/eva_twitter-outline.jpg'
import ig from '../assets/bx_bxl-instagram.jpg'
import cine from '../assets/CineOne21 2.jpg'
import hif from '../assets/hiflix 2.jpg'
import ebv from '../assets/ebv.id 2.jpg'

function footer() {
  return (
    <>
  <footer className="mx-auto flex flex-col md:flex-row max-w-7xl justify-between px-10 py-20 gap-y-16 md:gap-x-2">
    <div>
      <img className="h-20 w-auto" src="/assets/Tickitz 1.jpg" alt="logo" />
      <p className="font-medium text-gray-700 leading-8 tracking-wider">
        Stop waiting in line. Buy tickets <br />
        conveniently, watch movies quietly.
      </p>
    </div>
    <div className="flex flex-col gap-y-6">
      <h1 className="text-base font-bold leading-5">Explore</h1>
      <div className="flex flex-row md:flex-col gap-x-12 gap-y-2">
        <h2 className="text-gray-800">Home</h2>
        <h2 className="text-gray-800">List Movie</h2>
      </div>
    </div>
    <div className="flex flex-col gap-y-5">
      <h1 className="text-base font-bold leading-5">Our Sponsor</h1>
      <div className="flex flex-row md:flex-col gap-x-12 gap-y-4">
        <img
          className="w-32 h-auto overflow-hidden"
          src={ebv}
          alt="#"
        />
        <img
          className="w-44 h-auto overflow-hidden"
          src={cine}
          alt="#"
        />
        <img
          className="w-32 h-auto overflow-hidden"
          src={hif}
          alt="#"
        />
      </div>
    </div>
    <div className="flex flex-col gap-y-7">
      <h1 className="text-base font-bold leading-5">Follow Us</h1>
      <div className="flex gap-x-6">
        <div className="flex flex-row md:flex-col gap-x-12 gap-y-4">
          <img
            className="w-8 md:w-6 h-auto"
            src={fb}
            alt=""
          />
          <img
            className="w-8 md:w-6 h-auto"
            src={ig}
            alt=""
          />
          <img
            className="w-8 md:w-6 h-auto"
            src={tw}
            alt=""
          />
          <img
            className="w-8 md:w-6 h-auto"
            src={yt}
            alt=""
          />
        </div>
        <div className="hidden md:flex flex-col gap-y-4">
          <p>Tickitz Cinema id</p>
          <p>tickitz.id</p>
          <p>tickitz.id</p>
          <p>Tickitz Cinema id</p>
        </div>
      </div>
    </div>
  </footer>
  <p className="md:text-center font-sm text-gray-800 leading-8 tracking-wider px-5 py-10">
    © 2020 Tickitz. All Rights Reserved
  </p>
</>
  )
}

export default footer

