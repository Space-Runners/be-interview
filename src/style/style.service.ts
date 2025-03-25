import { Injectable } from '@nestjs/common';
import { STYLES } from 'src/common/constants';

import { StyleResponse } from './style.dto';

@Injectable()
export class StyleService {
  getStyles(): StyleResponse[] {
    return Object.values(STYLES).map((style) => style);
  }
}
