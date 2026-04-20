from __future__ import annotations

import argparse
import os
from pathlib import Path

import psycopg


MIGRATIONS_DIR = Path(__file__).resolve().parent.parent / "migrations"


def get_database_url() -> str:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set")
    return database_url


def ensure_migrations_table(connection: psycopg.Connection) -> None:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS schema_migrations (
                version TEXT PRIMARY KEY,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
            """
        )


def applied_versions(connection: psycopg.Connection) -> set[str]:
    with connection.cursor() as cursor:
        cursor.execute("SELECT version FROM schema_migrations")
        return {row[0] for row in cursor.fetchall()}


def upgrade() -> None:
    database_url = get_database_url()
    migrations = sorted(MIGRATIONS_DIR.glob("*.sql"))
    with psycopg.connect(database_url) as connection:
        ensure_migrations_table(connection)
        current_versions = applied_versions(connection)
        for migration in migrations:
            if migration.name in current_versions:
                continue
            sql = migration.read_text(encoding="utf-8")
            with connection.cursor() as cursor:
                cursor.execute(sql)
                cursor.execute(
                    "INSERT INTO schema_migrations (version) VALUES (%s)",
                    (migration.name,),
                )
        connection.commit()


def main() -> None:
    parser = argparse.ArgumentParser(description="Apply database migrations.")
    parser.add_argument("command", choices=["upgrade"])
    args = parser.parse_args()
    if args.command == "upgrade":
        upgrade()


if __name__ == "__main__":
    main()
