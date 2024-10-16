// src/routes/staff/+page.server.js
import Database from 'better-sqlite3';
import path from 'path';
import { count_seat } from '$lib/utils_reserve.js'; // Import count_seat function

const dbPath = path.resolve('src/lib/databaseStorage/dbforTrain-2.db');

export const actions = {
  updateTrip: async ({ request }) => {
    const db = new Database(dbPath);
    const formData = await request.formData();
    const tripId = formData.get('tripId');
    const start = formData.get('start');
    const end = formData.get('end');
    const fromDatetime = formData.get('fromDatetime');
    const staff = formData.get('staff');

    try {
      db.prepare(`
        UPDATE TRIPS
        SET start_station_id = (SELECT station_id FROM STATIONS WHERE station_name = ?),
            end_station_id = (SELECT station_id FROM STATIONS WHERE station_name = ?),
            from_datetime = ?,
            staff_id = ?
        WHERE trip_id = ?
      `).run(start, end, fromDatetime, staff, tripId);

      return { success: true };
    } catch (error) {
      console.error('Error updating trip:', error);
      return { error: 'Unable to update trip' };
    } finally {
      db.close();
    }
  },

  updateStation: async ({ request }) => {
    const db = new Database(dbPath);
    const formData = await request.formData();
    const stationId = formData.get('stationId');
    const name = formData.get('name');
    const address = formData.get('address');
    const time = formData.get('time');
    const status = formData.get('status');

    try {
      db.prepare(`
        UPDATE STATIONS
        SET station_id = ?,
            station_name = ?,
            station_address = ?,
            time_use = ?,
            station_status = ?
        WHERE station_id = ?
      `).run(stationId, name, address, time, status, stationId);

      return { success: true };
    } catch (error) {
      console.error('Error updating station:', error);
      return { error: 'Unable to update station' };
    } finally {
      db.close();
    }
  },

  deleteTrip: async ({ request }) => {
    const db = new Database(dbPath);
    const formData = await request.formData();
    const tripId = formData.get('tripId');

    try {
      db.prepare(`DELETE FROM TRIPS WHERE trip_id = ?`).run(tripId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting trip:', error);
      return { error: 'Unable to delete trip' };
    } finally {
      db.close();
    }
  },

  deleteStation: async ({ request }) => {
    const db = new Database(dbPath);
    const formData = await request.formData();
    const stationId = formData.get('stationId');

    try {
      db.prepare(`DELETE FROM STATIONS WHERE station_id = ?`).run(stationId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting station:', error);
      return { error: 'Unable to delete station' };
    } finally {
      db.close();
    }
  },

  countSeatsForTrip: async ({ request }) => {
    const db = new Database(dbPath);
    const formData = await request.formData();
    const tripId = formData.get('tripId');

    try {
      const { query, params } = count_seat(tripId); // Use the count_seat function
      const seats = db.prepare(query).all(...params);

      return { success: true, seats };
    } catch (error) {
      console.error('Error counting seats:', error);
      return { error: 'Unable to count seats' };
    } finally {
      db.close();
    }
  },
};