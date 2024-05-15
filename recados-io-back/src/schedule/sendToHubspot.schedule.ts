import cron from 'node-cron';

export const HubspotSchedules = () => {
  const hubspotSchedule = cron.schedule('* * * * * *', () => {
    console.log("chamou hubspot", new Date());
  }, {
    timezone: 'America/Sao_Paulo',
    scheduled: false,
  });

  hubspotSchedule.start()
}