# Copyright © 2019 Province of British Columbia
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Model to handle all operations related to Role."""
import enum
from sqlalchemy import Column, Integer, String

from .code_table import CodeTableVersioned
from .db import db


class RoleEnum(enum.Enum):
    """Enum for role"""

    RESPONSIBLE_EPD = 1
    TEAM_LEAD = 2
    OFFICER_ANALYST = 3
    FN_CAIRT = 4
    OTHER = 5
    TEAM_CO_LEAD = 6


class Role(db.Model, CodeTableVersioned):
    """Model class for Role."""

    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(), nullable=False)
    sort_order = Column(Integer, nullable=False)

    def as_dict(self):
        """Return Json representation."""
        return {
            'id': self.id,
            'name': self.name
        }

    @classmethod
    def find_by_name(cls, name):
        """Find role by name."""
        return cls.query.filter_by(name=name).one_or_none()

    @classmethod
    def find_all_by_names(cls, names):
        """Find role by name."""
        return cls.query.filter(Role.name.in_(names)).all()
