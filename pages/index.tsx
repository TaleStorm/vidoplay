
import Movies from '../components/movies'
import Recomandations from '../components/recomendations'



function IndexPage() {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <Movies />

            <Recomandations />
        </div>
    )
}

export default IndexPage
