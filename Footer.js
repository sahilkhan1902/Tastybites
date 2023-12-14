
const Footer = () => {
    return (<>
      <div className="relative top-16 flex flex-col justify-between border border-black md:flex md:flex-row  py-10 mb-2 text-white bg-black">
        <div className="flex flex-1 justify-around ">
          <div className="leftFooter1">
            <span className="opacity-50 font-medium">COMPANY INFO</span>
            <ul className="mt-4 flex flex-col gap-2">
              <a href="">
                <li className="text-b">About us</li>
              </a>
              <a href="">
                <li className="text-b">Team</li>
              </a>
              <a href="">
                <li className="text-b">Careers</li>
              </a>
              <a href="">
                <li className="text-b"> Blog</li>
              </a>
              
             
              <a href="">
                <li className="text-b">Tasty Bites Corporate</li>
              </a>
              <a href="">
                <li className="text-b">Tasty Bites Found</li>
              </a>
             
            </ul>
          </div>
          <div className="leftFooter2">
            <span className="opacity-50 font-medium">CONTACT US</span>
            <ul className="mt-4 flex flex-col gap-2">
              <a href="">
                <li className="text-b">Help & Support</li>
              </a>
              <a href="">
                <li className="text-b">Partern with us</li>
              </a>
              <a href="">
                <li className="text-b">Ride with us</li>
              </a>
            </ul>
          </div>
        </div>
        <div className=" flex flex-1 justify-around md:mt-0 mt-10 ">
          <div className="hidden md:block rightFooter1">
            <span className="opacity-50 font-medium">LEGAL</span>
            <ul className="mt-4 flex flex-col gap-2">
              <a href="">
                <li className="text-b">Terms & Conditions</li>
              </a>
              <a href="">
                <li className="text-b">Refund & Cancellation</li>
              </a>
              <a href="">
                <li className="text-b">Privacy Policy</li>
              </a>
              
              <a href="">
                <li className="text-b">Offer Terms</li>
              </a>
             
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <img
            className="h-12 cursor-pointer"
              alt=""
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
            />
            <img
            className="h-12 cursor-pointer"
              alt=""
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
            />
          </div>
        </div>
      </div>
        <div className="text-center absolute w-full h- text-white bg-yellow-400 mt-8"><p className="h-8">Created By ❤️ Sahil Khan © 2023</p></div>
      </>
    );
  };
  export default Footer;
  
