import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HealthInsuranceComponent } from './health-insurance/health-insurance.component';
import { MotorInsuranceComponent } from './motor-insurance/motor-insurance.component';
import { EmithramInsuranceSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HEALTH_INSURANCE_ROUTE } from './health-insurance/health-insurance.route';
import { MOTOR_INSURANCE_ROUTE } from './motor-insurance/motor-insurance.route';

@NgModule({
  declarations: [HealthInsuranceComponent, MotorInsuranceComponent],
  imports: [EmithramInsuranceSharedModule, RouterModule.forChild([HEALTH_INSURANCE_ROUTE, MOTOR_INSURANCE_ROUTE])],
})
export class InsuranceModule {}
