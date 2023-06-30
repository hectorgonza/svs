
import { ThreeCircles} from 'react-loader-spinner';
export default function Loading (){

    return  <div
    className="show-grid text-center" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
  >
    <ThreeCircles color="#5F2299" height="100" width="100" />
 </div>

}