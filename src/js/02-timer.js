import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  choseDateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let selectedDate = null;
let intervalId = null;

refs.startButton.setAttribute('disabled', true);

refs.startButton.addEventListener('click', onStartClick);

flatpickr(refs.choseDateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const delta = selectedDate - Date.now();

    if (delta <= 0) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        backOverlay: true,
        clickToClose: true,
        closeButton: true,
      });
      return;
    }

    refs.startButton.removeAttribute('disabled');
  },
});

function onStartClick() {
  intervalId = setInterval(() => {
    const diference = selectedDate - Date.now();

    if (diference <= 1000) {
      clearInterval(intervalId);
    }

    const convertedTime = convertMs(diference);

    refs.days.textContent = addLeadingZero(convertedTime.days);
    refs.hours.textContent = addLeadingZero(convertedTime.hours);
    refs.minutes.textContent = addLeadingZero(convertedTime.minutes);
    refs.seconds.textContent = addLeadingZero(convertedTime.seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
