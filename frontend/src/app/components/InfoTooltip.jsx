import Image from 'next/image';
import iconPositive from '../images/icon-positive.svg';
import iconNegative from '../images/icon-negative.svg';
import Popup from './Popup';
import { popupInfo } from '../utils/data-list';

export default function InfoTooltip({ onClose, isOpen, errorMessage }) {
  const { name, title } = popupInfo;
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      {!errorMessage ? (
        <Image src={iconPositive} alt='' />
      ) : (
        <Image src={iconNegative} alt='' />
      )}
      <h2 className={`popup__heading popup__heading_type_${name}`}>
        {!errorMessage ? title : `${errorMessage}`}
      </h2>
    </Popup>
  );
}
