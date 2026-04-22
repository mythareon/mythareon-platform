"""add billing fields to users

Revision ID: 20260422_0002
Revises: 20260422_0001
Create Date: 2026-04-22 04:20:00

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "20260422_0002"
down_revision: Union[str, None] = "20260422_0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("plan_tier", sa.String(length=50), nullable=False, server_default="free"))
    op.add_column("users", sa.Column("stripe_customer_id", sa.String(length=255), nullable=True))
    op.add_column("users", sa.Column("stripe_subscription_id", sa.String(length=255), nullable=True))
    op.add_column("users", sa.Column("subscription_status", sa.String(length=50), nullable=True, server_default="inactive"))
    op.add_column("users", sa.Column("subscription_current_period_end", sa.DateTime(), nullable=True))

    op.create_index(op.f("ix_users_stripe_customer_id"), "users", ["stripe_customer_id"], unique=True)
    op.create_index(op.f("ix_users_stripe_subscription_id"), "users", ["stripe_subscription_id"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_users_stripe_subscription_id"), table_name="users")
    op.drop_index(op.f("ix_users_stripe_customer_id"), table_name="users")

    op.drop_column("users", "subscription_current_period_end")
    op.drop_column("users", "subscription_status")
    op.drop_column("users", "stripe_subscription_id")
    op.drop_column("users", "stripe_customer_id")
    op.drop_column("users", "plan_tier")
