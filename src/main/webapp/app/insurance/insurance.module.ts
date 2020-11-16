import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HealthComponent } from './health/health.component';
import { MotorComponent } from './motor/motor.component';
import { EmithramInsuranceSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HEALTH_INSURANCE_ROUTE } from './health/health.route';
import { MOTOR_INSURANCE_ROUTE } from './motor/motor.route';

@NgModule({
  declarations: [HealthComponent, MotorComponent],
  imports: [EmithramInsuranceSharedModule, RouterModule.forChild([HEALTH_INSURANCE_ROUTE, MOTOR_INSURANCE_ROUTE])],
})
export class InsuranceModule {}
