import { Controller, Get } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleResponse } from './style.dto';

@Controller('/styles')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  @Get('/')
  getStyles(): StyleResponse[] {
    return this.styleService.getStyles();
  }
}
