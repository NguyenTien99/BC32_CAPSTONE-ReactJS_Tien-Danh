import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SeatList from './SeatList'
import InfoBooking from './InfoBooking';
// import bookingMovieAPI from '../../services/bookingMovieAPI';
import Loading from '../../components/Loading';
import { listBooking } from '../../slices/bookingMovieSlice';
import cn from 'classnames';
import styles from './BookingMovie.module.scss';

const BookingMovie = () => {
    const { maLichChieu } = useParams();
    // const [infoMovie, setInfoMovie] = useState(); 
    const dispatch = useDispatch();
    const {infoMovie} = useSelector(state => state.bookingMovieSlice)

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const data = await bookingMovieAPI.getListBooking(maLichChieu);
    //             setInfoMovie(data);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })()
    // },[])

    useEffect(() => {
        dispatch(listBooking(maLichChieu));
    },[maLichChieu]);

    if(!infoMovie){
        return <Loading />;
    }

  return (
    <div className={styles.wrapBookingMovie}>
        <div className="container">
        <div className={cn('row', styles.bookingMovie)}>
            <div className="col-12 col-lg-7">
                <SeatList /> 
            </div>
            <div className='col-12 col-lg-5'>
                <InfoBooking />
            </div>
        </div>
        </div>
    </div>
  );
};

export default BookingMovie;