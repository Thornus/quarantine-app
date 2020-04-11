import * as MailComposer from 'expo-mail-composer';
import moment from 'moment';
import { t } from 'i18n-js';

export default sendEmail = (doctorEmail, symptomsByDay, startDate, name) => {
  let body = '';

  for (let i = 0; i < symptomsByDay.length; i++) {
    const dateString = moment(startDate).add(i, 'days').format('L');
    body += `${t('home.day')} ${i+1} (${dateString})\n`;

    if(symptomsByDay[i].length) {
      for (let j = 0; j < symptomsByDay[i].length; j++) {
        let appended = ', ';

        if(j === symptomsByDay[i].length-1) {
          appended = '';
        }

        body += `${symptomsByDay[i][j]}${appended}`
      }
    } else {
      body += t('symptomsHistory.emailNoSymptoms');
    }

    body += '.\n\n';
  }

  const options= {
    recipients: [doctorEmail],
    subject: `${name}${t('symptomsHistory.emailSubject')}`,
    body
  }

  MailComposer.composeAsync(options);
}
