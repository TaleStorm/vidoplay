const FooterSocials = () => {
    const vkLink = "https://vk.com/chill.online"
    const okLink = "https://ok.ru/group/58370962686133"
    const instagramLink =  'https://www.instagram.com/itschillonline/'
    const facebookLink = "https://www.facebook.com/itschillonline"
    const telegramLink = "https://t.me/chill_online"
    const youtubeLink = "https://www.youtube.com/channel/UC8uFUbZc0ozz4DpDJlbfL-g?view_as=subscriber"
    const dzenLink = "https://cutt.ly/7bQ01H0"
    const links = [
        {
            link: vkLink,
            image: "/social/vk.svg"
        },
        {
            link: okLink,
            image: "/social/ok.svg"
        },
        {
            link: instagramLink,
            image: "/social/instagram.svg"
        },
        {
            link: facebookLink,
            image: "/social/facebook.svg"
        },
        {
            link: telegramLink,
            image: "/social/telegram.svg"
        },
        {
            link: youtubeLink,
            image: "/social/youtube.svg"
        },
        {
            link: dzenLink,
            image: "/social/zen.svg"
        }
    ]

  

    return (
        <div className={`flex items-center w-full`}>
            {links.map((link,i) => (
                <a key={i} href={link.link} className={`w-7 h-7 mt-3 flex-shrink-0 ${i + 1 !== links.length ? "mr-3" : ""}`} target="_blank" rel="noopener noreferrer">
                    <img src={link.image} className={`w-full h-full opacity-70 transition-opacity duration-200 hover:opacity-100`}/>
                </a>
            ))}
        </div>
    )
}

export default FooterSocials