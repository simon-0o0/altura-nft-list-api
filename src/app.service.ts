import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  FAKE_COLLECTION_NAME,
  HOWRARE_COLLECTIONS_API,
  HOWRARE_MINTS_API,
  HOWRARE_OWNER_API,
} from './helper/constants.helper';
import { logger } from './helper/logger.helper';
import { ERROR_LIST } from './helper/error.helper';
import { GetMintsDTO } from './dto/getMints.dto';

@Injectable()
export class AppService {
  // get all collections
  async getCollections() {
    try {
      let list = [];
      const res = (await axios.get(HOWRARE_COLLECTIONS_API)).data;
      if (res.result && res.result.api_response === 'Success')
        list = res.result.data;

      return { statusCode: 200, error: null, message: null, data: list };
    } catch (e) {
      logger.error(`Get collections: ${e}`);

      return {
        statusCode: 500,
        error: 'error',
        message: [ERROR_LIST.SOMETHING_WENT_WRONG],
        data: null,
      };
    }
  }

  // get mints in collection
  async getMints(dto: GetMintsDTO) {
    try {
      let mints;
      const mintsRes = (
        await axios.get(
          HOWRARE_MINTS_API.replace(FAKE_COLLECTION_NAME, dto.collectionName),
        )
      ).data;
      const ownersRes = (
        await axios.get(
          HOWRARE_OWNER_API.replace(FAKE_COLLECTION_NAME, dto.collectionName),
        )
      ).data;
      if (
        mintsRes.result &&
        mintsRes.result.api_response === 'Success' &&
        ownersRes.result &&
        ownersRes.result.api_response === 'Success'
      ) {
        mints = mintsRes.result.data;
        mints.owners = ownersRes.result.data.owners;
      }

      return { statusCode: 200, error: null, message: null, data: mints };
    } catch (e) {
      logger.error(`Get mints: ${e}`);

      return {
        statusCode: 500,
        error: 'error',
        message: [ERROR_LIST.SOMETHING_WENT_WRONG],
        data: null,
      };
    }
  }
}
