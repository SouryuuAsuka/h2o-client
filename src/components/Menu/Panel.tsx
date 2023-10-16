import brandLogo from '@/assets/images/brand.svg';
import archiveIcon from '@/assets/images/icons/panel/archive.svg';
import calendarIcon from '@/assets/images/icons/panel/calendar.svg';
import databaseIcon from '@/assets/images/icons/panel/database.svg';
import personsIcon from '@/assets/images/icons/panel/persons.svg';
import reportsIcon from '@/assets/images/icons/panel/reports.svg';
import settingsIcon from '@/assets/images/icons/panel/settings.svg';
import statisticIcon from '@/assets/images/icons/panel/statistic.svg';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Panel() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  console.log(path);
  return (
    <div className="panel">
      <div className="panel__brand">
        <img src={brandLogo} />
      </div>
      <div className='panel__button'>
        <div className={'panel__button_item ' + (path === 'archive' ? 'active' : '')} onClick={() => navigate('/archive')}>
          <img src={archiveIcon} alt='archive' />
        </div>
        <div className={'panel__button_item ' + (path === 'calendar' ? 'active' : '')} onClick={() => navigate('/calendar')}>
          <img src={calendarIcon} alt='calendar' />
        </div>
        <div className={'panel__button_item ' + (path === 'database' ? 'active' : '')} onClick={() => navigate('/database')}>
          <img src={databaseIcon} alt='database' />
        </div>
        <div className={'panel__button_item ' + (path === 'persons' ? 'active' : '')} onClick={() => navigate('/persons')}>
          <img src={personsIcon} alt='persons' />
        </div>
        <div className={'panel__button_item ' + (path === 'reports' ? 'active' : '')} onClick={() => navigate('/reports')}>
          <img src={reportsIcon} alt='reports' />
        </div>
        <div className={'panel__button_item ' + (path === 'settings' ? 'active' : '')} onClick={() => navigate('/settings')}>
          <img src={settingsIcon} alt='settings' />
        </div>
        <div className={'panel__button_item ' + (path === 'statistic' ? 'active' : '')} onClick={() => navigate('/statistic')}>
          <img src={statisticIcon} alt='statistic' />
        </div>
      </div>
    </div>
  )
}