async function getEvents() {
  const res = await fetch(`${process.env.BACKEND_BASE_URL}/api/events`);
  const events = await res.json();
  return events;
}

export default getEvents;
