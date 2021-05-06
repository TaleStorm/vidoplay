import { CommentsData } from '../interfaces'
import CommentBlock  from './comment'

type CommentsProps = CommentsData

const Comments = (data: CommentsProps) => {

	console.log(data)

	return(
  	<div className="ml-8">
		  	<h4 className="text-sm font-roboto text-mainText font-normal block mt-4 opacity-80">
                Комментарии
            </h4>
		  {data.comments.slice(0,20).map((comment, i) =>   
				<CommentBlock {...comment}/>
          )}
	</div>
)}

export default Comments

