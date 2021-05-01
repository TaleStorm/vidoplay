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
        <div className="hidden mt-2 sm:mt-3 text-sm col-span-1 flex flex-row space-x-2 items-center">
          <a href="/#" className="self-center">
            {/* TG logo */}
            <img
              src={`/images/Telegram.svg`}
              alt=""
              style={{ minHeight: 28, minWidth: 28 }}
            />
          </a>

          <a href="/#" className="self-center">
            {/* OK logo */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#F68634" />
              <path d="M16.6225 18.4002L18.8641 20.5643C19.3234 21.0066 19.3234 21.7251 18.8641 22.1679C18.4054 22.6107 17.6619 22.6107 17.2036 22.1679L14.9996 20.0413L12.7975 22.1679C12.5679 22.3891 12.267 22.4998 11.9662 22.4998C11.6658 22.4998 11.3654 22.3891 11.1358 22.1679C10.677 21.7251 10.677 21.0071 11.1353 20.5643L13.3772 18.4002C12.5609 18.2207 11.7737 17.9085 11.0487 17.4694C10.4999 17.1354 10.3351 16.4357 10.6808 15.9056C11.0256 15.3748 11.7507 15.215 12.3004 15.5489C13.942 16.5458 16.0567 16.546 17.6993 15.5489C18.249 15.215 18.9738 15.3748 19.3193 15.9056C19.665 16.4353 19.4997 17.1354 18.951 17.4694C18.2259 17.909 17.4387 18.2207 16.6225 18.4002Z" fill="white" />
              <path fillRule="evenodd" clipRule="evenodd" d="M14.9897 15.2408C12.7783 15.2408 10.9797 13.505 10.9797 11.371C10.9797 9.23632 12.7783 7.5 14.9897 7.5C17.2016 7.5 18.9996 9.23632 18.9996 11.371C18.9996 13.505 17.2016 15.2408 14.9897 15.2408Z" fill="white" />
              <path fillRule="evenodd" clipRule="evenodd" d="M14.9897 9.76855C15.9052 9.76855 16.65 10.4872 16.65 11.371C16.65 12.2541 15.9052 12.9732 14.9897 12.9732C14.0748 12.9732 13.3293 12.2541 13.3293 11.371C13.3293 10.4872 14.0748 9.76855 14.9897 9.76855Z" fill="#F68634" />
            </svg>
          </a>


          <a href="/#" className="self-center">
            {/* Insta logo */}
            <img
              src={`/images/Instagram.svg`}
              alt=""
              style={{ minHeight: 28, minWidth: 28 }}
            />
          </a>

          <a href="/#" className="self-center">
            {/* Youtube logo */}
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 13.5C0 6.04416 6.04416 0 13.5 0C20.9558 0 27 6.04416 27 13.5C27 20.9558 20.9558 27 13.5 27C6.04416 27 0 20.9558 0 13.5Z" fill="#FF0000" />
              <path d="M20.3989 10.166C20.2333 9.5298 19.7453 9.02883 19.1257 8.8588C18.0028 8.5498 13.4998 8.5498 13.4998 8.5498C13.4998 8.5498 8.99678 8.5498 7.87382 8.8588C7.25421 9.02883 6.76625 9.5298 6.60065 10.166C6.2998 11.319 6.2998 13.7248 6.2998 13.7248C6.2998 13.7248 6.2998 16.1305 6.60065 17.2836C6.76625 17.9198 7.25421 18.4208 7.87382 18.5909C8.99678 18.8998 13.4998 18.8998 13.4998 18.8998C13.4998 18.8998 18.0028 18.8998 19.1257 18.5909C19.7453 18.4208 20.2333 17.9198 20.3989 17.2836C20.6998 16.1305 20.6998 13.7248 20.6998 13.7248C20.6998 13.7248 20.6998 11.319 20.3989 10.166Z" fill="white" />
              <path d="M12.1499 16.2002V11.7002L15.7499 13.9503L12.1499 16.2002Z" fill="#FF0000" />
            </svg>

          </a>

          <a href="/#" className="self-center">
            {/* Dzen logo */}
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 27C20.9558 27 27 20.9558 27 13.5C27 6.04418 20.9558 0 13.5 0C6.04418 0 0 6.04418 0 13.5C0 20.9558 6.04418 27 13.5 27Z" fill="white" />
              <path d="M4.5 13.5C4.5 8.52943 8.52943 4.5 13.5 4.5C18.4706 4.5 22.5 8.52943 22.5 13.5C22.5 18.4706 18.4706 22.5 13.5 22.5C8.52943 22.5 4.5 18.4706 4.5 13.5Z" fill="black" />
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3179 4.5C13.2754 8.20266 13.0332 10.2748 11.654 11.654C10.2748 13.0332 8.20266 13.2754 4.5 13.3179V13.8552C8.20266 13.8977 10.2748 14.1398 11.654 15.519C13.0116 16.8766 13.2675 18.9056 13.3157 22.5H13.8574C13.9056 18.9056 14.1615 16.8766 15.519 15.519C16.8766 14.1615 18.9056 13.9056 22.5 13.8574V13.3157C18.9056 13.2675 16.8766 13.0116 15.519 11.654C14.1398 10.2748 13.8977 8.20266 13.8552 4.5H13.3179Z" fill="white" />
            </svg>
          </a>

          <a href="/#" className="self-center">
            {/* VK logo */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#4680C2" />
              <path fillRule="evenodd" clipRule="evenodd" d="M24.5201 10.8257C24.6683 10.3599 24.5201 10.0212 23.8638 10.0212H21.6831C21.1327 10.0212 20.8786 10.3176 20.7304 10.6352C20.7304 10.6352 19.6083 13.3451 18.0416 15.1023C17.5335 15.6104 17.3006 15.7798 17.0254 15.7798C16.8772 15.7798 16.6867 15.6104 16.6867 15.1447V10.8045C16.6867 10.2541 16.5173 10 16.0515 10H12.6217C12.283 10 12.0713 10.2541 12.0713 10.5081C12.0713 11.0374 12.8546 11.1644 12.9393 12.6464V15.8645C12.9393 16.5632 12.8123 16.6902 12.5371 16.6902C11.7961 16.6902 9.99649 13.9591 8.91674 10.8469C8.70499 10.2329 8.49331 10 7.94287 10H5.74099C5.10586 10 5 10.2964 5 10.614C5 11.1856 5.74099 14.0649 8.45093 17.8758C10.2506 20.4799 12.8123 21.8772 15.12 21.8772C16.5173 21.8772 16.6867 21.5596 16.6867 21.0304V19.0614C16.6867 18.4263 16.8137 18.3204 17.2583 18.3204C17.5759 18.3204 18.1475 18.4898 19.4389 19.7389C20.9209 21.2209 21.175 21.8984 22.0007 21.8984H24.1814C24.8165 21.8984 25.1129 21.5808 24.9436 20.9668C24.753 20.3529 24.0332 19.4637 23.1016 18.4051C22.5935 17.8123 21.8313 17.156 21.5984 16.8384C21.2809 16.415 21.3656 16.2456 21.5984 15.8645C21.5773 15.8645 24.2449 12.096 24.5201 10.8257Z" fill="white" />
            </svg>
          </a>

          <a href="/#" className="self-center">
            {/* FB logo */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 15C30 6.71488 23.2851 0 15 0C6.71488 0 0 6.71488 0 15C0 22.4883 5.48438 28.6934 12.6562 29.8184V19.3359H8.84763V15H12.6562V11.6953C12.6562 7.9365 14.8946 5.85938 18.3223 5.85938C19.9629 5.85938 21.6797 6.15234 21.6797 6.15234V9.84375H19.7871C17.9238 9.84375 17.3438 11.001 17.3438 12.1875V15H21.5039L20.8389 19.3359H17.3438V29.8184C24.5156 28.6934 30 22.4883 30 15Z" fill="#1877F2" />
              <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1875C17.3438 11.001 17.9238 9.84375 19.7872 9.84375H21.6797V6.15234C21.6797 6.15234 19.9629 5.85938 18.3223 5.85938C14.8946 5.85938 12.6563 7.9365 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8184C13.4209 29.9385 14.2032 30 15 30C15.7969 30 16.5792 29.9385 17.3438 29.8184V19.3359H20.8389Z" fill="white" />
            </svg>
          </a>
        </div>
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
            <a href="https://about.chillvision.ru/use_rules" >
              Правила использования
          </a>
          </div>
          <div className="mt-3">
            <a href="https://about.chillvision.ru/policy" >
              Политика конфиденциальности
          </a>
          </div>
          <div className="mt-3">
            <a href="https://about.chillvision.ru/usl_raz" >
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

