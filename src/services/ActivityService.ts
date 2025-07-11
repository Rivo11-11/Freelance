import { IActivity } from '../models/ActivityModel';
import ActivityModel from '../models/ActivityModel';
import BaseService from './BaseService';

export default class ActivityService extends BaseService<IActivity> {
  constructor() {
    super(ActivityModel);
  }

} 