import FooterSocials from "./footerSocials"

const Footer = (data:{onAboutChillClick?:Function}) => (

  <footer className="relative md:pl-16 md:pr-28 px-6 pt-36">
    <div className="font-roboto text-mainText text-base  flex flex-col-reverse sm:grid grid-cols-12 pb-8 sm:pb-0 pt-8 sm:pt-14 sm:h-72 mx-auto sm:overflow-hidden">
      <div className="col-span-2 hidden lg:block">
        <div className="flex  justify-center">
          <a href="/" className="-top-14 h-72 relative w-full">
            <span className="sr-only">Logo</span>
            <img className="h-2/3 w-auto" src="/images/logo.png" alt="" />
          </a>
        </div>
      </div>
      <div className="mt-6 sm:mt-0 lg:pl-10 col-span-4 sm:block flex flex-col items-center relative ">
        <a href="mailto:help@chillvision.ru">
          help@chillvision.ru
        </a>
        <FooterSocials/>
        <p className="mt-5 sm:mt-3 text-base">
          {`© ${new Date().getFullYear()}. ООО «ЧИЛЛ ВИЖН»`}
        </p>
        <img className="sm:hidden absolute h-5 bottom-1 right-0 " src="/images/18+.svg" alt="" />
      </div>
      <div className="grid grid-cols-6 col-span-8 lg:col-span-6">
        <div className="col-span-1 text-xs sm:text-base">
          {/* <div>
            <a href="/" > 
              Лента
            </a>
          </div> */}
          {/* <div className="mt-3"> */}
          <div>
            <a href="https://about.chillvision.ru" className="cursor-pointer" onClick={()=>data.onAboutChillClick()}>
              О CHILL
          </a>
          </div>
        </div>
        <div className="pl-8 col-span-5 relative text-xs sm:text-base">
          <div>
            <a href="/partnership" >
              Как стать автором контента
          </a>
          </div>
          <div className="mt-3">
            <a href="/rules" >
              Правила использования
          </a>
          </div>
          <div className="mt-3">
            <a href="/policy" >
              Политика конфиденциальности
          </a>
          </div>
          <div className="mt-3">
            <a href="/conditions" >
              Условия размещения контента пользователя в сервисе
          </a>
          </div>
          <img className="hidden sm:block absolute  top-1 right-0" src="/images/18+.svg" alt="" />
        </div>
      </div>
    </div>
  </footer>

)

export default Footer

