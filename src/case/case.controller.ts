import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CaseService } from './case.service';



@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}


}
