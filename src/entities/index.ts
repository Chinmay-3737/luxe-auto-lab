/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: carcategories
 * Interface for CarCategories
 */
export interface CarCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  categoryDescription?: string;
  /** @wixFieldType image */
  categoryImage?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: customizationoptions
 * Interface for CustomizationOptions
 */
export interface CustomizationOptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  optionName?: string;
  /** @wixFieldType text */
  optionType?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  previewImage?: string;
  /** @wixFieldType text */
  priceAdjustment?: string;
  /** @wixFieldType text */
  colorHexCode?: string;
  /** @wixFieldType text */
  materialFinish?: string;
  /** @wixFieldType multi_reference */
  customizationrequests?: CustomizationRequests[];
}


/**
 * Collection ID: customizationrequests
 * Interface for CustomizationRequests
 */
export interface CustomizationRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType multi_reference */
  selectedoptions?: CustomizationOptions[];
  /** @wixFieldType text */
  customerEmail?: string;
  /** @wixFieldType text */
  customerPhone?: string;
  /** @wixFieldType text */
  requestTitle?: string;
  /** @wixFieldType text */
  carModelPreference?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  colorPreferences?: string;
  /** @wixFieldType image */
  designInspirationImages?: string;
  /** @wixFieldType datetime */
  submissionDateTime?: Date | string;
  /** @wixFieldType text */
  requestStatus?: string;
  /** @wixFieldType multi_reference */
  premiumcars?: PremiumCars[];
}


/**
 * Collection ID: premiumcars
 * Interface for PremiumCars
 */
export interface PremiumCars {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType multi_reference */
  testdrivebookings?: TestDriveBookings[];
  /** @wixFieldType multi_reference */
  customizationrequests?: CustomizationRequests[];
  /** @wixFieldType text */
  make?: string;
  /** @wixFieldType reference */
  category?: CarCategories;
  /** @wixFieldType text */
  model?: string;
  /** @wixFieldType number */
  year?: number;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType image */
  galleryImages?: string;
  /** @wixFieldType url */
  threeSixtyViewUrl?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  engineType?: string;
  /** @wixFieldType number */
  horsepower?: number;
  /** @wixFieldType number */
  topSpeed?: number;
  /** @wixFieldType boolean */
  availability?: boolean;
}


/**
 * Collection ID: testdrivebookings
 * Interface for TestDriveBookings
 */
export interface TestDriveBookings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  customerEmail?: string;
  /** @wixFieldType text */
  customerPhone?: string;
  /** @wixFieldType text */
  carModel?: string;
  /** @wixFieldType date */
  preferredDate?: Date | string;
  /** @wixFieldType time */
  preferredTime?: any;
  /** @wixFieldType text */
  bookingStatus?: string;
  /** @wixFieldType multi_reference */
  premiumcars?: PremiumCars[];
}
