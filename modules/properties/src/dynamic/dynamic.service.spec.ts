/*
Copyright (c) 2017-2018 brewlabs SAS
*/
import { TestBed, inject } from "@angular/core/testing"

import { DynamicService } from "./dynamic.service"

describe("DynamicService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicService]
    })
  })

  it(
    "should be created",
    inject([DynamicService], (service: DynamicService) => {
      expect(service).toBeTruthy()
    })
  )
})
