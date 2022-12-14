# frozen_string_literal: true

class Location < ApplicationRecord
  include Searchable

  validates :title, presence: true
  validates_uniqueness_of :title

  validates :longitude, presence: true
  validates :latitude, presence: true
end
