# frozen_string_literal: true

namespace :seed do
  desc 'Load Locations from the JSON File'
  task seed_locations_from_json_file: :environment do
    locations_list = JSON.parse(File.read('locations.json'))

    locations_list.each do |location|
      # NOTE: # Ideally we should run this task in batches. Can use rails batch insert method like insert_all
      # NOTE: We can parallelize it by running each batch in delayed jobs

      # NOTE: To speed up the task, we can use rails insertion methods that skip validation on creation like insert!
      Location.create!(title: location['name'], latitude: location['position']['lat'],
                       longitude: location['position']['lng'])

    rescue ActiveRecord::RecordInvalid => e
      # NOTE: Rake task should be idempotent. Therefore handling this error and logging
      # Log here
      puts "#{location['id']} creation failed due to the errors: #{e}"
    end
  end
end
