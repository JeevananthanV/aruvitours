import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Packages from '../pages/Packages';
import FixedDepartures from '../pages/FixedDepartures';
import HNILuxuryTours from '../pages/HNILuxuryTours';
import NotFound from '../pages/NotFound';
import Kerala from '../pages/Kerala';
import Goa from '../pages/Goa';
import Andaman from '../pages/Andaman';
import GoldenTriangle from '../pages/GoldenTriangle';
import HimachalPradesh from '../pages/HimachalPradesh';
import Kashmir from '../pages/Kashmir';
import Rajasthan from '../pages/Rajasthan';
import Sikkim from '../pages/Sikkim';
import Assam from '../pages/Assam';
import Gujarat from '../pages/Gujarat';
import Ladakh from '../pages/Ladakh';
import Lakshadweep from '../pages/Lakshadweep';
import Odisha from '../pages/Odisha';
import Meghalaya from '../pages/Meghalaya';
import ArunachalPradesh from '../pages/ArunachalPradesh';
import Malaysia from '../pages/Malaysia';
import Singapore from '../pages/Singapore';
import Thailand from '../pages/Thailand';
import SriLanka from '../pages/SriLanka';
import Bali from '../pages/Bali';
import Dubai from '../pages/Dubai';
import Maldives from '../pages/Maldives';
import Nepal from '../pages/Nepal';
import Bhutan from '../pages/Bhutan';
import Philippines from '../pages/Philippines';
import Vietnam from '../pages/Vietnam';
import Cambodia from '../pages/Cambodia';
import Japan from '../pages/Japan';
import China from '../pages/China';
import Kenya from '../pages/Kenya';
import Brunei from '../pages/Brunei';
import HongKongMacau from '../pages/HongKongMacau';
import Russia from '../pages/Russia';
import Turkey from '../pages/Turkey';
import Egypt from '../pages/Egypt';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/fixed-departures" element={<FixedDepartures />} />
      <Route path="/hni-luxury-tours" element={<HNILuxuryTours />} />

      <Route path="/domestic/kerala" element={<Kerala />} />
      <Route path="/domestic/goa" element={<Goa />} />
      <Route path="/domestic/andaman" element={<Andaman />} />
      <Route path="/domestic/golden-triangle" element={<GoldenTriangle />} />
      <Route path="/domestic/himachal" element={<HimachalPradesh />} />
      <Route path="/domestic/kashmir" element={<Kashmir />} />
      <Route path="/domestic/rajasthan" element={<Rajasthan />} />
      <Route path="/domestic/sikkim" element={<Sikkim />} />
      <Route path="/domestic/assam" element={<Assam />} />
      <Route path="/domestic/gujarat" element={<Gujarat />} />
      <Route path="/domestic/ladakh" element={<Ladakh />} />
      <Route path="/domestic/lakshadweep" element={<Lakshadweep />} />
      <Route path="/domestic/odisha" element={<Odisha />} />
      <Route path="/domestic/meghalaya" element={<Meghalaya />} />
      <Route path="/domestic/arunachal-pradesh" element={<ArunachalPradesh />} />

      <Route path="/international/malaysia" element={<Malaysia />} />
      <Route path="/international/singapore" element={<Singapore />} />
      <Route path="/international/thailand" element={<Thailand />} />
      <Route path="/international/sri-lanka" element={<SriLanka />} />
      <Route path="/international/bali" element={<Bali />} />
      <Route path="/international/dubai" element={<Dubai />} />
      <Route path="/international/maldives" element={<Maldives />} />
      <Route path="/international/nepal" element={<Nepal />} />
      <Route path="/international/bhutan" element={<Bhutan />} />
      <Route path="/international/philippines" element={<Philippines />} />
      <Route path="/international/vietnam" element={<Vietnam />} />
      <Route path="/international/cambodia" element={<Cambodia />} />
      <Route path="/international/japan" element={<Japan />} />
      <Route path="/international/china" element={<China />} />
      <Route path="/international/kenya" element={<Kenya />} />
      <Route path="/international/brunei" element={<Brunei />} />
      <Route path="/international/hong-kong-macau" element={<HongKongMacau />} />
      <Route path="/international/russia" element={<Russia />} />
      <Route path="/international/turkey" element={<Turkey />} />
      <Route path="/international/egypt" element={<Egypt />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}