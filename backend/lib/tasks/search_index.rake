# frozen_string_literal: true

namespace :search_index do
  desc 'Create indexes for the models on Elastic Search'
  task create_search_index: :environment do
    Location.__elasticsearch__.create_index!

    # To build index on the existing records, fetch and save them again
    # to trigger index creation on them
    # NOTE: It should be rather done in batches in order not to overflow the server's mem.
    Location.all.each(&:save)
  end
end
