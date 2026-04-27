import { Product } from './products';

// Official Ferris product images from ferrismowers.com HubSpot CDN
// Authorized dealer use â€” Ferris/Briggs & Stratton marketing imagery
const BASE = 'https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products';
const OLD  = 'https://www.ferrismowers.com/hs-fs/hubfs/Website%20Migration%202025/Ferris/Images/Products';

const galleryMap: Record<string, string[]> = {

  '300s': [
    `${BASE}/Zero%20Turn%20Mowers/300S/Features%20and%20Benefits/Premium%20Features.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300S/Features%20and%20Benefits/Commercial%20Grade%20Power.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300S/Features%20and%20Benefits/Fab%20Mowing%20Deck.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300S/Features%20and%20Benefits/Hitch%20Mount.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/300S/Features%20and%20Benefits/HydroGear%20Transaxles.jpg`,
  ],

  '300r': [
    `${BASE}/Zero%20Turn%20Mowers/300R/FER_300R_FL-PDP.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300R/FER_300R_FR-PDP.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300R/FER_300R_F-PDP.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300R/FER_300R_CompactManeuverability.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300R/FER_300R_Deck.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/300R/FER_300R_Traction.jpg`,
  ],

  '300e': [
    `https://www.ferrismowers.com/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/FER-zero-turn-mower-300eHero.jpg`,
    `https://www.ferrismowers.com/hs-fs/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/Ferris_NA_300e_FandB_FullSuspension.jpg`,
    `https://www.ferrismowers.com/hs-fs/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/Ferris_NA_300e_FandB_MowerDeck.jpg`,
    `https://www.ferrismowers.com/hs-fs/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/Ferris_NA_300e_FandB_Battery.jpg`,
    `https://www.ferrismowers.com/hs-fs/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/Ferris_NA_300e_FandB_Charger.jpg`,
    `https://www.ferrismowers.com/hs-fs/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/Ferris_NA_300e_FandB_Operating%20System.jpg`,
    `https://www.ferrismowers.com/hs-fs/hubfs/Ferris/US/Products/Zero%20Turn%20Mowers/300e/Ferris_NA_300e_FandB_BrushlessMotor.jpg`,
  ],

  '500s': [
    `${BASE}/Zero%20Turn%20Mowers/500/Product%20Images/FER_Products_500S.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-Suspension.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-Engine.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-headlight.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-Deck.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-Hitch.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-transaxle.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/500S/Features%20and%20Benefits/FER_500S_FB-Tires.jpg`,
  ],

  'is600': [
    `${BASE}/Zero%20Turn%20Mowers/IS600/Product%20Images/FER_PDP_IS600_Hero_FR.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-Engine.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_PDP_IS600_FB-Operator.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-Suspension.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-Performance.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-Transmission.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-EasyAccess.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-Protection.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS600/Features%20and%20Benefits/FER_600_FB-Mower_Spindles.jpeg`,
  ],

  'is700': [
    `${BASE}/Zero%20Turn%20Mowers/IS700/Product%20Images/FER_PDP_IS700_Hero_FL.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Product%20Images/FER_PDP_IS700_Hero-K.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Product%20Images/FER_PDP_IS700_Hero-Lifestyle.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-Suspension.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-Performance.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-Transmission.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-EasyAccess.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-CuttingSystem.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-Spindles.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS700/Features%20and%20Benefits/FER_PDP_IS700_FB-Bumper.jpeg`,
  ],

  'isx800': [
    `${BASE}/Zero%20Turn%20Mowers/ISX800/Product%20Images/FER_ISX800_FL-PDP.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_IS800_FB-Oil.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_IS800_FB-CuttingSystem.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_IS800_FB-USB.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_IS800_FB_EFI-ETC.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_ISX800_FB-Suspension.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_IS800_FB-Transmission.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX800/Features%20and%20Benefits/FER_PDP_IS800_FB-EasyAccess.jpeg`,
  ],

  'isx2200': [
    `${BASE}/Zero%20Turn%20Mowers/ISX2200/Product%20Images/FER_ISX2200_FL-PDP.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX2200/Features%20and%20Benefits/FER_PDP_ISX2200_FB-CuttingSystem.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX2200/Features%20and%20Benefits/FER_PDP_ISX2200_FB-USB.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/ISX2200/Features%20and%20Benefits/FER_PDP_ISX2200_FB-Suspension.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX2200/Features%20and%20Benefits/FER_PDP_ISX2200FB_BigBlock_480x270.png`,
    `${BASE}/Zero%20Turn%20Mowers/ISX2200/Features%20and%20Benefits/FER_PDP_ISX2200_FB-Transaxles.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/ISX2200/Features%20and%20Benefits/FER_ISX2200_HOCAdjustment.jpg`,
  ],

  'isx3300': [
    `${BASE}/Zero%20Turn%20Mowers/ISX3300/Product%20Images/FER_3300_FR.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX3300/Features%20and%20Benefits/FER_PDP_ISX3300_FB-CuttingSystem.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX3300/Features%20and%20Benefits/FER_PDP_ISX3300_FB-USB.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/ISX3300/Features%20and%20Benefits/FER_FB_ISX3300_BigBlock.png`,
    `${OLD}/Zero%20Turn%20Mowers/ISX3300/Features%20and%20Benefits/FER_FB_ISX3300_DriveSystem.png`,
    `${BASE}/Zero%20Turn%20Mowers/ISX3300/Features%20and%20Benefits/FER_PDP_ISX3300_FB-HerculesCastIron.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/ISX3300/Features%20and%20Benefits/FER_FB_ISX3300_VanguardThrottleControl.png`,
  ],

  'is2600': [
    `${BASE}/Zero%20Turn%20Mowers/IS2600/Product%20Images/FER_PDP_ISX2600_Hero_FR.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS2600/Product%20Images/FER_PDP_IS2600_Hero-FL.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS2600/Product%20Images/FER_PDP_IS2600_Hero-Back.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS2600/Product%20Images/FER_PDP_IS2600_Hero-Lifestyle.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/FER_PDP_IS2600_FB-Engine.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/FER_PDP_IS2600_FB-Suspension.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/Ferris_FeatureBenefit_IS2600_Accessibility.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/FER_PDP_IS2600_FB-Serviceability.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/Ferris_FeatureBenefit_IS2600_CastIronSpindles.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/Ferris_FeatureBenefit_IS2600_DeckLift.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/Ferris_FeatureBenefit_IS2600_Bumper.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS2600/Features%20and%20Benefits/FER_PDP_IS2600_FB-Steering.jpeg`,
  ],

  'is6200': [
    `${BASE}/Zero%20Turn%20Mowers/IS6200/Product%20Images/FER_IS6200_FL-PDP.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_PDP_IS6200_FB-CuttingSystem.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_PDP_IS6200_FB-USB.jpeg`,
    `${OLD}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_IS6200_DieselEngine.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_IS6200_SuspensionSystem.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_IS6200_ComputerMonitoring.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_IS6200_HydraulicDeckLift.jpg`,
    `${OLD}/Zero%20Turn%20Mowers/IS6200/Features%20and%20Benefits/FER_IS6200_HeavyDutyControls.jpg`,
  ],

  'srsz1': [
    `${BASE}/Stand-On%20Mowers/Z1/Product%20Images/FER_PDP_SRSZ1_Hero_FL.jpg`,
    `${BASE}/Stand-On%20Mowers/Z1/Product%20Images/FER_PDP_Z1_Hero-FR.jpg`,
    `${BASE}/Stand-On%20Mowers/Z1/Product%20Images/FER_PDP_Z1_Hero-KR.jpg`,
    `${BASE}/Stand-On%20Mowers/Z1/Product%20Images/FER_PDP_Z1_Hero-Lifestyle.jpg`,
    `${OLD}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-Suspension.jpg`,
    `${BASE}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-HeightofCut.jpeg`,
    `${BASE}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-SpeedControl.jpeg`,
    `${OLD}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-StandingComfort.jpg`,
    `${OLD}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-Transmissions.jpeg`,
    `${BASE}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-CuttingSystem.jpeg`,
    `${OLD}/Stand-On%20Mowers/Z1/Features%20and%20Benefits/FER_PDP_Z1_FB-Fuel.jpg`,
  ],

  'srsz2': [
    `${BASE}/Stand-On%20Mowers/Z2/Product%20Images/FER_PDP_SRSZ2_Hero_FL.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Product%20Images/FER_PDP_Z2_Hero-FR.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Product%20Images/FER_PDP_Z2_Hero-L.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Product%20Images/FER_PDP_Z2_Hero-KL.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Product%20Images/FER_PDP_Z2_Hero-Lifestyle.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-CuttingSystem.jpeg`,
    `${OLD}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-Suspension.jpg`,
    `${OLD}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-OilGuard.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-Engine.jpeg`,
    `${OLD}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-StandingComfort.jpg`,
    `${BASE}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-CuttingHeight.jpeg`,
    `${OLD}/Stand-On%20Mowers/Z2/Features%20and%20Benefits/FER_PDP_Z2_FB-Transmission.jpeg`,
  ],

  'srsz3x': [
    `${BASE}/Stand-On%20Mowers/Z3/Product%20Images/FER_PDP_SRSZ3X_Hero_FL.jpg`,
    `${BASE}/Stand-On%20Mowers/Z3/Product%20Images/FER_PDP_Z3X_Hero-FR.jpg`,
    `${BASE}/Stand-On%20Mowers/Z3/Product%20Images/FER_PDP_Z3X_Hero-L.jpg`,
    `${BASE}/Stand-On%20Mowers/Z3/Product%20Images/FER_PDP_Z3X_Hero-KL.jpg`,
    `${BASE}/Stand-On%20Mowers/Z3/Product%20Images/FER_PDP_Z3X_Hero-Lifestyle.jpg`,
    `${BASE}/Stand-On%20Mowers/Z3/Features%20and%20Benefits/FER_PDP_Z3_FB-CuttingSystem.jpeg`,
    `${OLD}/Stand-On%20Mowers/Z3/Features%20and%20Benefits/FER_PDP_Z3X_FB-FrontAxle.jpg`,
    `${OLD}/Stand-On%20Mowers/Z3/Features%20and%20Benefits/FER_PDP_Z3X_FB-Suspension.jpg`,
    `${OLD}/Stand-On%20Mowers/Z3/Features%20and%20Benefits/FER_PDP_Z3X_FB-OilGuard.jpg`,
    `${OLD}/Stand-On%20Mowers/Z3/Features%20and%20Benefits/FER_PDP_Z3X_FB-Fuel.jpg`,
    `${BASE}/Stand-On%20Mowers/Z3/Features%20and%20Benefits/FER_PDP_Z3_FB-Speedcontrol.jpeg`,
  ],

  'fw15': [
    `${BASE}/Walk%20Behind%20Mowers/FW15/Product%20Images/FER_FW15_UpdatedPDPImage.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW15/Product%20Images/FER_FW15_LFRONT.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW15/Product%20Images/FER_FW15_RSIDE.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW15/Product%20Images/FER_FW15_BACK.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW15/Features%20and%20Benefits/FER_FW15_Operation.jpeg`,
    `${OLD}/Walk%20Behind%20Mowers/FW15/Features%20and%20Benefits/FER_FW15_MowerDeck.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW15/Features%20and%20Benefits/FER_FW15_EasyHeighCutAdjustment.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW15/Features%20and%20Benefits/FER_FW15_Drive.jpeg`,
  ],

  'fw25': [
    `${BASE}/Walk%20Behind%20Mowers/FW25/Product%20Images/FER_PDP_FW25_Hero_FL.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Product%20Images/FER_PDP_FW25_Hero-FR.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_CruiseControl.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_Controls.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_EngineRunning.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_Neutral.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_WellBuilt.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_DeckMounting.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_BeltLife.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW25/Features%20and%20Benefits/Ferris_FeatureBenefit_FW25_ParkingBrake.jpg`,
  ],

  'fw45': [
    `${BASE}/Walk%20Behind%20Mowers/FW45/Product%20Images/FER_PDP_FW45_Hero_FL.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW45/Product%20Images/FER_PDP_FW45_Hero-FR.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW45/Product%20Images/FER_PDP_FW45_Hero-R.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW45/Product%20Images/FER_PDP_FW45_Hero-KL.jpg`,
    `${BASE}/Walk%20Behind%20Mowers/FW45/Product%20Images/FER_PDP_FW45_Hero-Lifestyle.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_FW45_PowerPerformance.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_PDP_FW45_FB-Oil.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_FW45_GasTankGuard.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_FW45_EnhancedFootPedal.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_FW45_NewSpindleAccess.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_FW45_ErgonomicParkingBrake.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_FW45_EnhanceMufflerGuard.jpg`,
    `${OLD}/Walk%20Behind%20Mowers/FW45/Features%20and%20Benefits/FER_PDP_FW45_FB-transaxle.jpg`,
  ],

  'fb1000': [
    `${BASE}/Stand-On%20Blowers/FB1000/Product%20Images/FER_PDP_FB1000_Hero_FL.jpg`,
    `${OLD}/Stand-On%20Blowers/FB1000/Features%20and%20Benefits/FER_FB1000_FB-Pedal.jpg`,
    `${OLD}/Stand-On%20Blowers/FB1000/Features%20and%20Benefits/FER_FB1000_FB-Footprint.jpg`,
    `${OLD}/Stand-On%20Blowers/FB1000/Features%20and%20Benefits/FER_FB1000_FB-Platform.jpg`,
    `${OLD}/Stand-On%20Blowers/FB1000/Features%20and%20Benefits/FER_FB1000_FB-Engine.jpg`,
    `${OLD}/Stand-On%20Blowers/FB1000/Features%20and%20Benefits/FER_FB1000_FB-Controls.jpg`,
  ],

  'fb2000': [
    `${BASE}/Stand-On%20Blowers/FB2000/Product%20Images/FER_PDP_FB2000_Hero_FL.jpg`,
    `${OLD}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-DeflectorControl.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-HandleSystem.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-AirFlow.jpeg`,
    `${BASE}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-Power.jpeg`,
    `${BASE}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-LEDLight.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-FrontAxle.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB2000/Features%20and%20Benefits/FER_FB2000_FB-Discharge.jpeg`,
  ],

  'fb3000': [
    `${BASE}/Stand-On%20Blowers/FB3000/Product%20Images/FER_PDP_FB3000_Hero_FL.jpg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-DeflectorControl.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-HandleSystem.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-AirFlow.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-BlowerHousing.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-Power.jpeg`,
    `${BASE}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-LEDLight.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-Axle.jpeg`,
    `${OLD}/Stand-On%20Blowers/FB3000/Features%20and%20Benefits/FER_FB3000_FB-Discharge.jpeg`,
  ],

  'procuts': [
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Product%20Images/FER_ProCutS_ProductImage.jpg`,
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Features%20and%20Benefits/FER_ProcutS_FB-Suspension.jpeg`,
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Features%20and%20Benefits/FER_ProcutS_FB-FootPedal.jpeg`,
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Features%20and%20Benefits/FER_ProcutS_FB-Pump.jpeg`,
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Features%20and%20Benefits/FER_ProcutS_FB-HeightAdjustment.jpeg`,
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Features%20and%20Benefits/FER_ProcutS_FB-Spindles.jpeg`,
    `${BASE}/Front%20Mount%20Mowers/Procut%20S/Features%20and%20Benefits/FER_ProcutS_FB-FuelTank.jpeg`,
  ],

  'fs3200': [
    `${BASE}/Spreader%20Sprayers/FS3200/Product%20Images/FER_VentureXC-FS3200_Updated.jpg`,
    `${BASE}/Spreader%20Sprayers/FS3200/Product%20Images/VentureXC_FS3200_LF.jpg`,
    `${BASE}/Spreader%20Sprayers/FS3200/Product%20Images/VentureXC_FS3200_PDP_R.jpg`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-CommercialPower.png`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-Hopper.png`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-Capacity.png`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-Boom.png`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-SprayWand.png`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-Frame.png`,
    `${BASE}/Spreader%20Sprayers/FS3200/Features%20and%20Benefits/FER_FS3100_FB-Maneuverability.png`,
  ],

  'fs2200': [
    `${BASE}/Spreader%20Sprayers/FS2200/Product%20Images/FER_PathfinderXC-FS2200_Updated.jpg`,
    `${BASE}/Spreader%20Sprayers/FS2200/Product%20Images/PathfinderXC_FS2200_PDP_LF.jpg`,
    `${BASE}/Spreader%20Sprayers/FS2200/Product%20Images/PathfinderXC_FS2200_R.jpg`,
    `${BASE}/Spreader%20Sprayers/FS2200/Product%20Images/Pathfinder_PDP_GateEntrance.png`,
    `${BASE}/Spreader%20Sprayers/FS2200/Features%20and%20Benefits/FER_FS2200_FB-Hopper.png`,
    `${BASE}/Spreader%20Sprayers/FS2200/Features%20and%20Benefits/FER_FS2200_FB-Capacity.png`,
    `${BASE}/Spreader%20Sprayers/FS2200/Features%20and%20Benefits/FER_FS2200_FB-SprayWidth.png`,
    `${BASE}/Spreader%20Sprayers/FS2200/Features%20and%20Benefits/FER_FS2200_FB-CompactSize.png`,
    `${BASE}/Spreader%20Sprayers/FS2200/Features%20and%20Benefits/FER_FS2200_FB-Frame.png`,
    `${BASE}/Spreader%20Sprayers/FS2200/Features%20and%20Benefits/FER_FS2200_FB-Maneuverability.png`,
  ],

  'fs2100': [
    `${BASE}/Spreader%20Sprayers/FS2100/Product%20Images/FER_Pathfinder-FS2100_Updated.jpg`,
    `${BASE}/Spreader%20Sprayers/FS2100/Product%20Images/PathfinderFS2100_PDP_LF.jpg`,
    `${BASE}/Spreader%20Sprayers/FS2100/Product%20Images/PathfinderFS2100_PDP_R.jpg`,
    `${BASE}/Spreader%20Sprayers/FS2100/Product%20Images/PathfinderFS2100_PDP_App1.jpeg`,
    `${BASE}/Spreader%20Sprayers/FS2100/Product%20Images/Pathfinder_PDP_SprayRes.png`,
    `${BASE}/Spreader%20Sprayers/FS2100/Features%20and%20Benefits/FER_FS2100_FB-Hopper.png`,
    `${BASE}/Spreader%20Sprayers/FS2100/Features%20and%20Benefits/FER_FS2100_FB-Capacity.png`,
    `${BASE}/Spreader%20Sprayers/FS2100/Features%20and%20Benefits/FER_FS2100_FB-SprayWidth.png`,
    `${BASE}/Spreader%20Sprayers/FS2100/Features%20and%20Benefits/FER_FS2100_FB-Frame.png`,
    `${BASE}/Spreader%20Sprayers/FS2100/Features%20and%20Benefits/FER_FS2100_FB-Maneuverability.png`,
  ],

  'fs1200': [
    `${BASE}/Spreader%20Sprayers/FS1200/Product%20Images/FER_RoverXC-FS1200_Updated.jpg`,
    `${BASE}/Spreader%20Sprayers/FS1200/Product%20Images/RoverXC_FS1200_PDP_LF.jpg`,
    `${BASE}/Spreader%20Sprayers/FS1200/Product%20Images/RoverXC_FS1200_PDP_R.jpg`,
    `${BASE}/Spreader%20Sprayers/FS1200/Product%20Images/RoverXC_FS1200_PDP_Application.jpg`,
    `${BASE}/Spreader%20Sprayers/FS1200/Features%20and%20Benefits/FER_FS1200_FB-Hopper.png`,
    `${BASE}/Spreader%20Sprayers/FS1200/Features%20and%20Benefits/FER_FS1200_FB-Controls.png`,
    `${BASE}/Spreader%20Sprayers/FS1200/Features%20and%20Benefits/FER_FS1200_FB-CompactSize.png`,
    `${BASE}/Spreader%20Sprayers/FS1200/Features%20and%20Benefits/FER_FS1200_FB-Frame.png`,
    `${BASE}/Spreader%20Sprayers/FS1200/Features%20and%20Benefits/FER_FS1200_FB-Manueverability.png`,
  ],

  'f60': [
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Hero%20Images/FER_PDP_F60_Hero_FL.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Hero%20Images/FER_F60_DeckAccess_Web-FB.png`,
    `${OLD}/Zero%20Turn%20Mowers/F60Z/Features%20and%20Benefits/F60_KawEngine_FB.jpg`,
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Features%20and%20Benefits/F60Z_FabricatedMowerDeck.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Features%20and%20Benefits/F60Z_Accessibility.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Features%20and%20Benefits/F60Z_CommercialTransmission.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Features%20and%20Benefits/F60Z_FootOperatedDeckLift.jpeg`,
    `${BASE}/Zero%20Turn%20Mowers/F60Z/Features%20and%20Benefits/F60Z_FixedFrameSeat.jpg`,
  ],
};

// Keyword patterns to match product names â†’ gallery key.
// [^\d]* between prefix and number tolerates Â® / â„¢ / whitespace.
// \b after the number prevents 600 from matching 6200 (order also reinforces this).
const namePatterns: [RegExp, string][] = [
  [/300e/i,                '300e'],
  [/300S/i,                '300s'],
  [/300R/i,                '300r'],
  [/500S/i,                '500s'],
  [/IS[^\d]*6200\b/i,      'is6200'],
  [/IS[^\d]*2600\b/i,      'is2600'],
  [/ISX[^\d]*3300\b/i,     'isx3300'],
  [/ISX[^\d]*2200\b/i,     'isx2200'],
  [/ISX[^\d]*800\b/i,      'isx800'],
  [/IS[^\d]*700\b/i,       'is700'],
  [/IS[^\d]*600\b/i,       'is600'],
  [/SRS.*Z3X/i,            'srsz3x'],
  [/SRS.*Z2/i,             'srsz2'],
  [/SRS.*Z1/i,             'srsz1'],
  [/FW[^\d]*45\b/i,        'fw45'],
  [/FW[^\d]*25\b/i,        'fw25'],
  [/FW[^\d]*15\b/i,        'fw15'],
  [/FB[^\d]*3000\b/i,      'fb3000'],
  [/FB[^\d]*2000\b/i,      'fb2000'],
  [/FB[^\d]*1000\b/i,      'fb1000'],
  [/FS[^\d]*3200\b/i,      'fs3200'],
  [/FS[^\d]*2200\b/i,      'fs2200'],
  [/FS[^\d]*2100\b/i,      'fs2100'],
  [/FS[^\d]*1200\b/i,      'fs1200'],
  [/ProCut/i,              'procuts'],
  [/F60/i,                 'f60'],
];

/**
 * Drop any Dykes-shot imagery (on-the-lot photos and our staged "dykes-*"
 * studio shots). Customer-facing product galleries should only show the
 * official Ferris-provided product imagery â€” clean white-background
 * studio renders.
 */
function isDykesShot(url: string): boolean {
  return url.includes('/images/ferris/lot/') || /-dykes-/.test(url);
}

export function getProductImages(product: Product): string[] {
  const sku = product.images ?? [];

  // Find the matching model-line gallery (if any).
  let lineup: string[] = [];
  for (const [pattern, key] of namePatterns) {
    if (pattern.test(product.name)) {
      lineup = galleryMap[key] ?? [];
      break;
    }
  }

  // SKU photos first (they're keyed to the exact model), then the shared
  // model-line library. Dedup preserves order. Fall back to imageUrl only
  // if neither source yielded anything. Filter out any Dykes-shot photos
  // so customers only see official Ferris product imagery.
  const merged = Array.from(new Set([...sku, ...lineup])).filter(
    (url) => !isDykesShot(url)
  );
  if (merged.length > 0) return merged;
  if (product.imageUrl && !isDykesShot(product.imageUrl)) return [product.imageUrl];
  // Ultimate fallback when every candidate was a Dykes-shot: pull whatever
  // Ferris-CDN images exist on the matched lineup, raw.
  return lineup.filter((url) => !isDykesShot(url));
}
