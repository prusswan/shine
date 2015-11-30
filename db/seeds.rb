# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

350_000.times.each_slice(1000) do |slice|
  time = Benchmark.realtime do
    Customer.transaction do
      slice.each do |i|
        Customer.create!(
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          username: "#{Faker::Internet.user_name}#{i}",
          email: "#{Faker::Internet.user_name}#{i}@#{Faker::Internet.domain_name}"
        )
      end
    end
  end

  p "[#{slice.first} - #{slice.last}] Time taken: #{time} seconds"
end
