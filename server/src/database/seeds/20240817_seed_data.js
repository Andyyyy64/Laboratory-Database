const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  await knex('comments').del();
  await knex('users').del();
  await knex('labos').del();

  const jsonFilePath = path.join(__dirname, '../../../labo_data_modified.json');
  const fileData = fs.readFileSync(jsonFilePath, 'utf8');
  const labosData = JSON.parse(fileData);

  await knex('labos').insert(
    labosData.map(entry => ({
      name: entry.name,
      prof: entry.professor,
      description: entry.description,
      prerequisites: entry.prerequisites,
      room_number: entry.room_number,
      student_field: entry.student_field,
      research_field: entry.research_field,
      prof_email: entry.professor_email
    }))
  );

  await knex('users').insert([
    { student_id: 's12345', email: 'student1@u-aizu.ac.jp', password: '$2b$10$sQbT/fhDY6PomOBZEiVE6uGrXMmGoMcufHAG1tVVCVRq.SLcbKmnS', grage: 3, field_of_interest: 'AI', labo_id: 1, liked_labos: [1, 2], is_varified: true, verificationCode: 123456, created_at: knex.fn.now() },
    { student_id: 's54321', email: 'student2@university.edu', password: 'password123', grage: 2, field_of_interest: 'Cybersecurity', labo_id: 2, liked_labos: [2], is_varified: true, verificationCode: 654321, created_at: knex.fn.now() },
  ]);

  await knex("comments").insert([
    { labo_id: 1, user_id: 1, student_id: "s12345" },
    { labo_id: 2, user_id: 2, student_id: "s54321" },
  ]);
};
