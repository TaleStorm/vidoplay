import CommentForm from "../components/commentForm"
import {useContext, useState} from 'react'
import LoginContext from "./context/loginContext"
import AuthModalContext from "./context/authModalContext"

const FilmComments = (data) => {
  const [comments, updateComments] = useState(data.comments)
	const [modalOpen, setModalOpen] = useState(false)
  const loginContext = useContext(LoginContext)
  const authModalContext = useContext(AuthModalContext)

  var addComment = (comment) => {
    comments.push(comment);
    updateComments(comments);
  };

  return (
    <div className="sm:mx-0 sm:py-10 ">
      <div className="sm:hidden block w-full mt-8 space-x-6">
        <button className="bg-orange w-full hover:bg-orange text-mainText font-normal py-2 px-14 rounded-md text-lg">
          Оставить отзыв
        </button>
      </div>
      <div className="flex justify-between">
        <h4 className="text-3xl font-roboto text-mainText font-normal block mt-4 mb-3 sm:mb-6">Отзывы</h4>
        <div className="flex items-center mt-2 sm:hidden">
          <h6 className="text-md font-roboto text-maintext font-normal">{comments?.length || 0}</h6>
          <svg
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline ml-1"
          >
            <path
              d="M15.9375 2.5H4.0625C3.48285 2.50165 2.9274 2.73265 2.51753 3.14253C2.10765 3.5524 1.87665 4.10785 1.875 4.6875V12.1875C1.87665 12.7672 2.10765 13.3226 2.51753 13.7325C2.9274 14.1424 3.48285 14.3734 4.0625 14.375H5.625V17.5L9.28594 14.4477C9.34216 14.4007 9.41308 14.375 9.48633 14.375H15.9375C16.5172 14.3734 17.0726 14.1424 17.4825 13.7325C17.8924 13.3226 18.1234 12.7672 18.125 12.1875V4.6875C18.1234 4.10785 17.8924 3.5524 17.4825 3.14253C17.0726 2.73265 16.5172 2.50165 15.9375 2.5V2.5Z"
              stroke="white"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-4">
        {comments?.map((comment, i) => {
          return (
            <div
              className="bg-cardBackground sm:grid grid-cols-12 grid-rows-1 grid-flow-column gap-4 pt-3 sm:pb-5 rounded-lg"
              key={i}
            >
              <div className="col-span-10 grid mx-7 sm:mx-0 justify-items-start">
                <div className="w-full flex justify-between items-baseline">
                  <div>
                    <a href="#" className="text-xl mt-0 sm:ml-7 block">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline"
                      >
                        <rect width="19" height="19" fill="#B82424" />
                        <path
                          d="M9.5 11.625C11.8472 11.625 13.75 9.72221 13.75 7.375C13.75 5.02779 11.8472 3.125 9.5 3.125C7.15279 3.125 5.25 5.02779 5.25 7.375C5.25 9.72221 7.15279 11.625 9.5 11.625Z"
                          stroke="#E87E7E"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M3.05786 15.3431C3.71101 14.2126 4.65016 13.2739 5.78097 12.6212C6.91178 11.9686 8.19444 11.625 9.50007 11.625C10.8057 11.625 12.0884 11.9686 13.2192 12.6213C14.35 13.274 15.2891 14.2127 15.9422 15.3433"
                          stroke="#E87E7E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-xs font-roboto text-mainText font-normal inline ml-2">{comment.username && comment.username != 'null '? comment.username : "Анонимный пользователь"}</h4>
                    </a>
                  </div>
                  <div>
                    <h6 className="sm:hidden font-roboto text-mainText text-xs inline font-normal self-end opacity-70">
                      {comment.dateString}
                    </h6>
                  </div>
                </div>
                <h4 className="text-base font-roboto text-mainText font-normal block sm:ml-7 mt-2 opacity-70 pb-5">
                  {comment.text}
                </h4>
              </div>
              <div className="hidden col-span-2 sm:grid justify-items-end mr-8">
                <h6 className="font-roboto text-mainText text-sm inline opacity-70">{comment.dateString}</h6>
                {/* <div className="text-sm col-span-1 flex flex-row justify-end space-x-7 content-end mt-8">
                  <a className="cursor-pointer self-center space-x-2 flex justify-center">
                    <h6 className="font-roboto text-mainText text-base inline self-center">{comment._likes}</h6>
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
                    >
                      <path
                        d="M2.74927 11.1875H8.37427V23.375H2.74927C2.50063 23.375 2.26217 23.2762 2.08635 23.1004C1.91054 22.9246 1.81177 22.6861 1.81177 22.4375V12.125C1.81177 11.8764 1.91054 11.6379 2.08635 11.4621C2.26217 11.2863 2.50063 11.1875 2.74927 11.1875V11.1875Z"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.37427 11.1875L13.0618 1.8125C13.5542 1.8125 14.0419 1.9095 14.4968 2.09795C14.9518 2.28641 15.3652 2.56263 15.7134 2.91085C16.0616 3.25907 16.3379 3.67247 16.5263 4.12744C16.7148 4.58241 16.8118 5.07004 16.8118 5.5625V8.375H24.0628C24.3287 8.375 24.5915 8.43154 24.8338 8.54087C25.0762 8.65019 25.2925 8.80981 25.4684 9.00912C25.6444 9.20843 25.7759 9.44288 25.8544 9.69692C25.9328 9.95095 25.9563 10.2188 25.9233 10.4826L24.5171 21.7326C24.4604 22.186 24.24 22.6032 23.8974 22.9056C23.5548 23.2081 23.1136 23.375 22.6566 23.375H8.37427"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <a className="cursor-pointer self-center space-x-2 flex justify-center">
                    <h6 className="font-roboto text-mainText text-base inline self-center">{comment._dislikes}</h6>
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
                    >
                      <path
                        d="M2.74927 1.625H8.37427V13.8125H2.74927C2.50063 13.8125 2.26217 13.7137 2.08635 13.5379C1.91054 13.3621 1.81177 13.1236 1.81177 12.875V2.5625C1.81177 2.31386 1.91054 2.0754 2.08635 1.89959C2.26217 1.72377 2.50063 1.625 2.74927 1.625V1.625Z"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.37427 13.8125L13.0618 23.1875C13.5542 23.1875 14.0419 23.0905 14.4968 22.902C14.9518 22.7136 15.3652 22.4374 15.7134 22.0891C16.0616 21.7409 16.3379 21.3275 16.5263 20.8726C16.7148 20.4176 16.8118 19.93 16.8118 19.4375V16.625H24.0628C24.3287 16.625 24.5915 16.5685 24.8338 16.4591C25.0762 16.3498 25.2925 16.1902 25.4684 15.9909C25.6444 15.7916 25.7759 15.5571 25.8544 15.3031C25.9328 15.0491 25.9563 14.7812 25.9233 14.5174L24.5171 3.26743C24.4604 2.81396 24.24 2.3968 23.8974 2.09435C23.5548 1.79191 23.1136 1.625 22.6566 1.625H8.37427"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div> */}
              </div>
              <div className="sm:hidden col-span-2 grid gap-x-0.5 grid-cols-2 ">
                {/* <div className="text-sm col-span-1 flex flex-row py-2 justify-center space-x-7 content-end bg-filmReviewBackground">
                  <a className="cursor-pointer self-center space-x-2">
                    <h6 className="font-roboto text-mainText text-base inline self-center">{comment._likes}</h6>
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
                    >
                      <path
                        d="M2.74927 1.625H8.37427V13.8125H2.74927C2.50063 13.8125 2.26217 13.7137 2.08635 13.5379C1.91054 13.3621 1.81177 13.1236 1.81177 12.875V2.5625C1.81177 2.31386 1.91054 2.0754 2.08635 1.89959C2.26217 1.72377 2.50063 1.625 2.74927 1.625V1.625Z"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.37427 13.8125L13.0618 23.1875C13.5542 23.1875 14.0419 23.0905 14.4968 22.902C14.9518 22.7136 15.3652 22.4374 15.7134 22.0891C16.0616 21.7409 16.3379 21.3275 16.5263 20.8726C16.7148 20.4176 16.8118 19.93 16.8118 19.4375V16.625H24.0628C24.3287 16.625 24.5915 16.5685 24.8338 16.4591C25.0762 16.3498 25.2925 16.1902 25.4684 15.9909C25.6444 15.7916 25.7759 15.5571 25.8544 15.3031C25.9328 15.0491 25.9563 14.7812 25.9233 14.5174L24.5171 3.26743C24.4604 2.81396 24.24 2.3968 23.8974 2.09435C23.5548 1.79191 23.1136 1.625 22.6566 1.625H8.37427"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div> */}
                {/* <div className="text-sm col-span-1 flex flex-row py-2 justify-center space-x-7 content-end bg-filmReviewBackground">
                  <a className="cursor-pointer self-center space-x-2">
                    <h6 className="font-roboto text-mainText text-base inline self-center">{comment._dislikes}</h6>
                    <svg
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
                    >
                      <path
                        d="M2.74927 11.1875H8.37427V23.375H2.74927C2.50063 23.375 2.26217 23.2762 2.08635 23.1004C1.91054 22.9246 1.81177 22.6861 1.81177 22.4375V12.125C1.81177 11.8764 1.91054 11.6379 2.08635 11.4621C2.26217 11.2863 2.50063 11.1875 2.74927 11.1875V11.1875Z"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.37427 11.1875L13.0618 1.8125C13.5542 1.8125 14.0419 1.9095 14.4968 2.09795C14.9518 2.28641 15.3652 2.56263 15.7134 2.91085C16.0616 3.25907 16.3379 3.67247 16.5263 4.12744C16.7148 4.58241 16.8118 5.07004 16.8118 5.5625V8.375H24.0628C24.3287 8.375 24.5915 8.43154 24.8338 8.54087C25.0762 8.65019 25.2925 8.80981 25.4684 9.00912C25.6444 9.20843 25.7759 9.44288 25.8544 9.69692C25.9328 9.95095 25.9563 10.2188 25.9233 10.4826L24.5171 21.7326C24.4604 22.186 24.24 22.6032 23.8974 22.9056C23.5548 23.2081 23.1136 23.375 22.6566 23.375H8.37427"
                        stroke="#F2F2F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div> */}
              </div>
            </div>
          )
        })}
      </div>
      <CommentForm 
        modalOpen ={modalOpen} 
        setModalOpen = {setModalOpen} 
        movieId = {data.movieId}
        addComment={addComment}
      />
      <div className="hidden sm:block mt-8 space-x-6">
        <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm" onClick = {() => {
          if (loginContext.userToken) {
            setModalOpen(!modalOpen)
          }
          else {
            authModalContext.setModalOpen(true)
          }
          
          }}>
          Оставить отзыв
        </button>
      </div>
      <nav className="flex justify-center pt-3 sm:hidden">
        <a href="#" className="text-base hover:text-gray-900">
          <h4 className="font-roboto text-orange font-normal text-base inline">Показать ещё</h4>
        </a>
      </nav>
    </div>
  )
}

export default FilmComments
