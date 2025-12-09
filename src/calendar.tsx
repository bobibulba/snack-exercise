import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarPage } from './pages/CalendarPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('calendar-root')!).render(
  <React.StrictMode>
    <CalendarPage />
  </React.StrictMode>,
);
