/**
 Cardiologist (heart)
Dermatologist (skin)
Ophthalmologist (eyes)
Gastroenterologist (digestive system)
Neurologist (nervous system)
Orthopedic surgeon (musculoskeletal system)
Pediatrician (children)
Psychiatrist (mental health)
Oncologist (cancer)
Obstetrician/Gynecologist (women's health)**/
const appointments = [
  {
    patientId: '68808c10b7dda358e03e00a1',
    doctorId: '68637c93cc24e922a47b5cfc',
    date: '2025-09-01',
    status: 'Booked',
    notes: 'Routine check-up',
  },
  {
    patientId: '68808c10b7dda358e03e00a2',
    doctorId: '6880865db7dda358e03e0086',
    date: '2025-09-02',
    status: 'Completed',
    notes: 'Post-surgery review',
  },
  {
    patientId: '68808c10b7dda358e03e00a3',
    doctorId: '6880865db7dda358e03e0087',
    date: '2025-09-03',
    status: 'Cancelled',
    notes: 'Patient unavailable',
  },
  {
    patientId: '68808c10b7dda358e03e00a4',
    doctorId: '6880865db7dda358e03e0088',
    date: '2025-09-04',
    status: 'Booked',
    notes: 'Follow-up required',
  },
  {
    patientId: '68808c10b7dda358e03e00a5',
    doctorId: '6880865db7dda358e03e0089',
    date: '2025-09-05',
    status: 'Completed',
    notes: 'Test results review',
  },
  // ... 45 more records
];

for (let i = 6; i <= 50; i++) {
  appointments.push({
    patientId: `68808c10b7dda358e03e00${a1 + i}`,
    doctorId: `6880865db7dda358e03e00${80 + i}`,
    date: `2025-09-${(i % 30 + 1).toString().padStart(2, '0')}`,
    status: ['Booked', 'Completed', 'Cancelled'][i % 3],
    notes: `Appointment note ${i}`,
  });
}
