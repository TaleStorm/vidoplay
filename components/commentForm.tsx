// data: { onInputChange: Function, onSubmit: Function, value: any }
import { get } from "node:https"
import { useContext, useEffect, useState } from "react"
import ModalOverlay from "./layout/modalOverlay"
import apiReq from "../services/api-requests"
import PlayerContext from "./context/playerContext"

const ApiReq = new apiReq()

const CommentForm = ({ onClose, movieId, addComment }) => {
  const [comentData, setCommentData] = useState({ text: '' })
  const [date, setDate] = useState(new Date())

  const { setIsSpaceListenerActive } = useContext(PlayerContext)

  const getCommentText = (e) => {
    setCommentData({ ...comentData, [e.target.name]: e.target.value })
  }

  const sendComment = async () => {
    const userId = localStorage.getItem('_user')
    if (userId && comentData.text !== '') {
      let data = {
        text: comentData.text,
        date: new Date(),
        dateString: "",
        _userId: userId,
        _movieId: movieId,
        _likes: 0,
        _dislikes: 0,
      }

      await ApiReq.createComment(data)

      const dateArray = String(date.toLocaleString()).split(",")[0].split(".");
      data.dateString = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]}`;
      addComment(data);

      onClose();
      setCommentData({ ...comentData, ['text']: '' });
    }

  }

  useEffect(() => {
    setIsSpaceListenerActive(false)    

    return (() => {setIsSpaceListenerActive(true) })
  }, [])

  return (
    <div className="w-full flex justify-center">
      <div className="ml-7 max-w-screen-lg flex justify-center w-full flex-col px-10 py-6 mt-20 bg-background">
        <div className="relative w-full mb-2 ">
          <h1 className="mx-auto text-center text-2xl">Оставить отзыв</h1>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 absolute -mr-6 top-0 right-0"
            onClick={() => { onClose() }}
          >
            <path
              d="M14.1213 12L23.5608 2.56046C23.842 2.27919 24 1.89772 24 1.49996C24 1.10219 23.842 0.720719 23.5608 0.439457C23.2795 0.158195 22.898 0.000183105 22.5003 0.000183105C22.1025 0.000183105 21.721 0.158195 21.4398 0.439457L12.0003 9.87896L2.56076 0.439457C2.42149 0.30019 2.25616 0.189718 2.0742 0.114347C1.89224 0.0389762 1.69721 0.000183105 1.50026 0.000183105C1.30331 0.000183105 1.10828 0.0389762 0.926323 0.114347C0.744363 0.189718 0.579029 0.30019 0.439762 0.439457C0.1585 0.720719 0.000488281 1.10219 0.000488281 1.49996C0.000488281 1.89772 0.1585 2.27919 0.439762 2.56046L9.87926 12L0.439762 21.4395C0.1585 21.7207 0.000488281 22.1022 0.000488281 22.5C0.000488281 22.8977 0.1585 23.2792 0.439762 23.5605C0.721024 23.8417 1.1025 23.9997 1.50026 23.9997C1.89803 23.9997 2.2795 23.8417 2.56076 23.5605L12.0003 14.121L21.4398 23.5605C21.5787 23.7002 21.744 23.8112 21.926 23.8869C22.108 23.9625 22.3031 24.0015 22.5003 24.0015C22.6974 24.0015 22.8925 23.9625 23.0745 23.8869C23.2565 23.8112 23.4218 23.7002 23.5608 23.5605C23.7002 23.4213 23.8108 23.256 23.8863 23.074C23.9617 22.892 24.0006 22.697 24.0006 22.5C24.0006 22.303 23.9617 22.1079 23.8863 21.9259C23.8108 21.7439 23.7002 21.5786 23.5608 21.4395L14.1213 12Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="mb-3 border-2 h-48 rounded-lg sm:px-8 py-4 pl-4 pr-2 sm:py-6 mt-3 focus-within:outline-none bg-popupBackground w-full text-ui-text focus-within:border-orange hover:border-orange border-popupBorder  transition-all duration-200 ease-out">
          <textarea
            style={{ resize: "none" }}
            className={`styled-scroll focus:outline-none bg-transparent w-full h-full pr-4`}
            name="text"
            value={comentData.text}
            onChange={(e) => { getCommentText(e) }}
            placeholder="Введите отзыв"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => sendComment()}
            className="mx-auto text-center text-h2-mobile text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full max-w-sm"
          >
            Опубликовать
        </button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
