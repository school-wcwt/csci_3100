import { StarBorderRounded, StarRounded, StarHalfRounded } from '@material-ui/icons'

export default function Rating({rating}) {
    const fullStars = ~~(rating/2);
    const halfStars = rating % 2;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <div>
        {[...Array(fullStars)].map((x, i)  => <StarRounded key={`star-${i}`}/>)}
        {halfStars ? <StarHalfRounded key={`star-${fullStars}`}/> : null}
        {[...Array(emptyStars)].map((x, i) => <StarBorderRounded key={`star-${i-emptyStars+5}`}/>)}
      </div>
    ) 
}