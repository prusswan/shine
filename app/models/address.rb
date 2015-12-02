class Address < ActiveRecord::Base
  belongs_to :state
end

class CustomersBillingAddress < ActiveRecord::Base
  belongs_to :customer
  belongs_to :address
end

class CustomersShippingAddress < ActiveRecord::Base
  belongs_to :customer
  belongs_to :address
end
