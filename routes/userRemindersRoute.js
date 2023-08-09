const express = require('express');
const router = express.Router();

// Import controller
const addUserReminders = require('../controllers/userReminders/addUserReminders');
const editUserReminders = require('../controllers/userReminders/editUserReminders');
const getUserReminders = require('../controllers/userReminders/getUserReminders');
const getUpcomingReminder = require('../controllers/userReminders/getUpcomingReminder');

// Routes

/**
 * @openapi
 * /api/v1/userReminders/editUserReminders/{id}:
 *   patch:
 *     summary: Edit User Reminders
 *     description: Edit User Reminders
 *     tags: [UserReminders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user reminder to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title.
 *               expire_date:
 *                 type: string
 *                 description: Expire date.
 *               reminder_date:
 *                 type: string
 *                 description: Reminder date.
 *     responses:
 *       200:
 *         description: User Reminders Object
 */
router.patch('/editUserReminders/:id', editUserReminders);

/**
 * @openapi
 * /api/v1/userReminders/addUserReminders:
 *   post:
 *     summary: Add User Reminders
 *     description: Add User Reminders
 *     tags: [UserReminders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: User ID.
 *               sticker_id:
 *                 type: string
 *                 description: Sticker id.
 *               vehicle_number:
 *                 type: string
 *                 description: Vehicle number.
 *               title:
 *                 type: string
 *                 description: Title.
 *               expire_date:
 *                 type: string
 *                 description: Expire date.
 *               reminder_date:
 *                 type: string
 *                 description: Reminder date.
 *     responses:
 *       200:
 *         description: User Reminders Object
 */
router.post('/addUserReminders', addUserReminders);

/**
 * @openapi
 * /api/v1/userReminders/getUserReminders:
 *   post:
 *     summary: Get User Reminders
 *     description: Get User Reminders
 *     tags: [UserReminders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sticker_id:
 *                 type: string
 *                 description: Sticker id.
 *     responses:
 *       200:
 *         description: User Reminders Object
 */
router.post('/getUserReminders', getUserReminders);

/**
 * @openapi
 * /api/v1/userReminders/getUpcomingReminder:
 *   post:
 *     summary: Get Upcoming Reminders
 *     description: Get Upcoming Reminders
 *     tags: [UserReminders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: User id.
 *     responses:
 *       200:
 *         description: Upcoming Reminders Object
 */
router.post('/getUpcomingReminder', getUpcomingReminder);

module.exports = router;
